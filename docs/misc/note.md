# Note

## kernel

- process management
  - scheduling
  - context switch
- memory management
  - memory protection
  - virtual memory
  - paging
    - page directory
      - page table
  - dynamic memory allocation
    - runtime heap
- device drivers
- filesystems

## k8s

- components
  - control plane components
    - kube-apiserver
      - k8s http api
    - etcd
      - key-value store for all api
    - kube-scheduler
      - assign pod to node
    - kube-controller-manager
    - cloud-controller-manager
      - integrates with cloud providers
  - node components
    - kubelet
      - manage pods (containers)
    - kube-proxy
    - container runtime

- Node
  - VM
  - Pod CIDR

- Pod
  - logical-host
  - unique ip address assigned
  - smallest deployable unit
  - environment to run containers
  - shared storage volumes
  - network resources

- workload resources
  - Deployment
  - Job
  - StatefulSet
  - DaemonSet

```
             Control Plane
   ┌────────────────────────────────────┐
   │                                    │
   │  Deployment: hello-deploy          │
   │    └─ ReplicaSet (3 replicas)      │
   │         └─ Pods: P1, P2, P3        │
   └────────────────────────────────────┘
                     │
                     ▼
          Worker Nodes (physical/VM)
   ┌──────────────────┬──────────────────┐
   │ Node A           │ Node B           │
   │  - Pod P1        │  - Pod P2, P3    │
   │  - kubelet       │  - kubelet       │
   │  - containerd    │  - containerd    │
   └──────────────────┴──────────────────┘

```
