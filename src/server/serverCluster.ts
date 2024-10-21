import dotenv from 'dotenv';
import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';
import { server } from './server';

dotenv.config();
const PORT = parseInt(process.env.PORT || '4000', 10);
const numCPUs = os.cpus().length - 1;
let currentWorker = 0;
const workerPorts = Array.from({ length: numCPUs }, (_, i) => PORT + (i + 1));

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT: PORT + (i + 1) });
  }

  const loadBalancer = http.createServer((req, res) => {
    const workersPort = workerPorts[currentWorker];

    const options = {
      hostname: 'localhost',
      port: workersPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxy = http.request(options, (workerRes) => {
      workerRes.pipe(res);
    });

    proxy.on('error', (err) => {
      console.error(`Error forwarding request to worker: ${err.message}`);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error (Worker failure)' }));
    });

    req.pipe(proxy);

    currentWorker = (currentWorker + 1) % workerPorts.length;
  });

  loadBalancer.listen(PORT, () => {
    console.log(`Load balancer is listening on port ${PORT}`);
  });

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const workerPort = process.env.PORT;

  server.listen(workerPort, () => {
    console.log(`Worker ${process.pid} started on port ${workerPort}`);
  });
}
