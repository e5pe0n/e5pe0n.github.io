---
title: "WIP: AWS Certified Solution Architect Associate Study"
categories:
  - AWS
tags:
  - AWS
last_modified_at: 2023-08-19
---

# Architecture Pillars

- resilience architectures
- high-performancing architectures
- secure architectures
- cost-optimizing architectures

---

# Management & Governance

## AWS Organizations

organize multiple resources, accounts, account groups, etc.

- share resources through a unified **AWS Single Sign-on configuration** that applies global permissions to all your accounts
- apply IAM rules globally through SCPs (service control policies)
- create and manage accounts along with account users and groups programmatically
- audit, monitor, and secure all your environments for compliance and functional purpose. a single account's CloudTrail can be configured to watch events from your entire organization

## AWS Control Tower

automate to set up sets of multiple resources, accounts, account groups, etc.

- **automate** the setup of a well-architected multi-account environment and customize the environment based on best practices though **landing zones**
- ensure that your provisioned resources always conform to your policies.

- underlying services
  - AWS Organizations
  - AWS Service Catalog
  - AWS IAM Identity Center
  - AWS Config
  - AWS CloudFormation
  - Amazon CloudWatch
  - AWS CloudTrail
  - AWS Identity and Access Management
  - Amazon Simple Storage Service
  - Amazon Simple Notification Service
  - AWS Lambda
  - AWS Step Functions

## AWS Servicee Catalog

ensure **compliance** with corporate standards

- take templates (e.g. CloudFormation template, prebuilt machine images, etc.) and use it to make exactly resources you approve available to exactly the users you designate
- set availability and cunsumption limits

## AWS License Manager

manage **software licenses**

- License Management dashboard
  - tracking usage
  - monitoring compliance
  - enforce applicable rules
- on-premises software also available

## SSM; AWS Systems Manager

operations hub to perform *actions* against AWS resources and on-premises servers

- AWS System Manager documents (SSM documents)
  - define actions
  - types
    - **Automation**
      - define actions against AWS resources
    - **Command**
      - define actions against Linux or Windows instances
    - **Policy**
      - defined porocesses for collecting inventory data from managed instances

### Automation

- e.g.
  - restart multiple EC2 instances
  - update CloudFormation stacks
  - patch AMIs

### Run Command

- install an agent into an instance and on-premises managed instance then run command
- need to apply an instance profile role that contains the permissions in the AmazonSSMManagedInstanceCore policy
### Session Manager

- keep a log of all logins in CloudTrail
- store a record of commands run within a session in an S3 bucket

### Patch Manager

- patch baselines
  - which available patches to install
  - whether the patches will be install automatically or require approval
- auto-approval delay (except Ubuntu)
  - 7 days

### State Manager

- configuration management tool that ensure your instances have the software you want them to have and configured in the way you define
- create *association* that defines
  - the command document to run
  - parameters
  - target instances
  - schedule

### AWS System Manager Inventory

collect and aggregate metadata from instances

- *inventory association*
  - all instances in your account: *global inventory association*
  - select instance manually
  - by tag
- Inventory collect data at least **every 30 minutes**

# Security, Identity and Compliance

## AWS Artifact

digital repository that allows customers to download **compliance-related information** about their AWS accounts and services
- compliance reports
- security audit information
  - AWS Service Organization Control (SOC) reports
  - Payment Card Industry Data Security Standard (PCI DSS) reports
  - ISO 27001 certifications


# Customer Enablement

## Support

- Basic Plan
  - customer service, documentation, whitepapers and support forum
- Developer Plan
  - **$29/month or 3% of monthly AWS charge**
  - **one account holder**
  - system impaired response
  - limited general guidance
- Business Plan
  - **$100/month or 10% of monthly AWS charge (up to $10,000)**
  - **unlimited users**
  - faster guaranteed response for impaired system
  - personal guidance
  - troubleshooting
  - support API
- Enterprise On-Ramp
  - **$5,500/month or 10% of monthly AWS charge**
  - fast response for business-crutial system down events
  - proactive guidance
  - consultative review
- Enterprise
  - **$15,000/month**
  - AWS solutions architects for operational and design reviews
  - technical account manager
  - online self-paced labs

# Migration & Transfer

## AWS Migration Hub

dashboard about migrations

## AWS Application Migration Service

automates the testing and transfer of AWS-bound migration of non-cloud application servers

- install **AWS Replication Agent** on the servers to be migrated
- CloudEndure
  - AWS tool to automate migrations to AWS GovCloud or China Region

## AWS Database Migration Service

- need to provide accessable **database endpoints**
- could convert
  - RDB -> data lake that lives in S3
  - Oracle DB -> AWS Aurora DB

## AWS Application Discovery Service

collect information to plan the right migration strategy

- need to install **Application Discovery Agents** on on-premises servers

## AWS Snow Family

- Snowcone
  - storage 22 TB
  - vCPUs: 4
  - memory: 4 GB
- Snowball Edge Storage Optimized
  - memory 80 TB
  - vCPUs: 40
  - memory: 80 GB
- Snowball Edge Compute Optimized
  - storage: 42 TB
  - vCPUs: 52
  - memory: 208 GB
- Snowmobile
  - storage: PB or EB

## AWS DataSync

- on-premises data stores ->
  - S3, Glacier, EFS, FSx, RDS (with AWS Database Migration Service)
- transfer rate: 10 Gbps
- encryption
- data validation

# Compute

## EC2; Elastic Compute Cloud

### AMI; Amazon Machine Image

- Amazon Quick Start AMIs
  - officially supported
- AWS Marketplace AMIs
  - official production-ready images provided by vendors
    - Splunk
    - Trend Micro
- Community AMIs
  - community images
- Private AMIs
  - AWS VM Import/Export (by way of S3)
  

### Instance Types

- General perpose (MTMA)
  - types
    - Mac
    - T4g, T3, T2
    - M6g, M6i, M6a, M5, M5a, M5n, M5zn, M4
    - A1
- Compute optimized (CHpc)
  - types
    - C7g, C6g, C6i, C6a, C5, C5a, C5n, C4
    - Hpc6a
  - for
    - **web servers**
    - **high-end machine learning workloads**
- Memory optimized (RXz + High Memory)
  - types
    - R6g, R6i, R5, R5a, R5b, R5n, R4
    - X2gd, X2idn, X2iedn, X2iezn, X1e, X1
    - High Memory
    - z1d
  - for
    - **database**
    - **data analysis**
    - **caching**
- Accelerated computing
  - types
    - P4, P3, P2
    - DL1
    - Trn1
    - Inf1
    - G5, G5g, G4dn, G4ad, G3
    - F1
    - VT1
  - for
    - **high-performance computing**
    - **high-end financial, engineering, AI workloads**
    - **medical search**
- Storage optimized (IHD)
  - types
    - Im4gn
    - Is4gen
    - I4i, I3, I3en
    - D2, D3, D3en
    - H1
  - for
    - **fast read/write and low-latency access to EBS volumes**
    - **distributed filesystems**
    - **heavyweight data processing apps**

### Tenancy

- shared tenancy (default)
- Dedicated Instance
  - isolate from other customer organizations' accounts
- Dedicated Host
  - identify and control the physical server

### Placement Groups

- Cluster
  - launch each associated instance into a single AZ within close physical proximity to each other
  - -> low-latency network interconnectivity
    - HPC apps
- Spread
  - separate instances physically across **distinct** hardware wracks and AZ
  - -> **fault tolerant**
- Partition
  - partition instances
  - possibly two instances will share physical hardware

### Service Limits

by default, one account can have

- 5 VPCs per region
- 5,000 SSH key pairs

### EBS Volumes; Elastic Block Store Volumes

persistent virtual storage drives attached to EC2 instance

- EBS Data Lifecycle Manager
  - automate the creation, retention and deletion of EBS-based snapshots and AMIs

- Volume types
  - EBS-Provisioned IOPS SSD
    - io2 Block Express
      - max IOPS/volume: 256,000
      - max throughput/volume: 4,000 MiB/s
    - io1, io2
      - max IOPS/volume: 64,000
      - max throughput/volume: 1,000 MiB/s
  - EBS General-Purpose SSD
    - gp3
      - max IOPS/volume: 16,000
      - max throughput/volume: 1000 MiB/s
    - gp2
      - max IOPS/volume: 16,000
      - max throughput/volume: 250 MiB/s
  - Throughput Optimized HDD
    - st1
      - max IOPS/volume: 500
      - max throughput/volume: 500 MiB/s
  - Cold HDD
    - sc1
      - max IOPS/volume: 250
      - max throughput/volume: 250 MiB/s

- create snapshot
  - -> generate another volume then attach it to other instance
  - -> convert AMI image
- generate AMI image directly

### Instance Store Volumes

**ephemeral** storage

- SSDs physically attached to the instance and connected via a fast NVMe (Non-Volatile Memory Express)
- the use of instance volumes is included in the price of the instance itself
- **for operations requiring low-latency access to large amounts of data that needn't survive a system failure or reboot**
  - import disposable data from external sources

### ENI; Elastic Network Interfaces

- primary ENI
  - the first ENI attached to an instance
  - can't remove the primary ENI from an instance, and can't change it's subnet
  - primary IP address of an instance is bound to a primary ENI
    - can't change or remove the address
- any address assigned to the ENI must come from the CIDR of the subnet to which it is attached
- **must be associated at least one security group**
- additional ENI in a different subnet can be attached
- but must be in the same AZ as the instance

### Enhanced Networking

higher network throughput speeds and lower latency than ENIs

- ENA; Elastic Network Adapter
  - throughput speeds up to 100 Gbps
  - Amazon Linux and Ubuntu AMIs enabled by default
- VF; Intel 82599 Virtual Function Interface
  - throughput speeds up to 10 Gbps

### Security Groups

- *stateful* firewall for an EC2 instance (**instance level traffic control**)
  - when a security group allows traffic to pass in one direction, it allows reply traffic in the opposite direction
- attached to ENIs
- inbound rules
  - source IP
  - protocol
  - destination port range
- outbound rules

### Auto Scaling

#### EC2 Launch Configs

- launch configurations
  - old fashion
  - only for Auto Scaling; **can't launch an instance manually using a launch configuration**
  - **not editable**
- launch templates
  - **versioned**
  - can launch an instance
  - can be created from a lanuch configuration

#### Auto Scaling Groups

- load balancer
- health check
- metrics
  - average CPU utilization
  - average request count per target
  - average network bytes in
  - average network bytes out
- capacity limits
  - Mininum
  - Maximum
  - Desired Capacity
- auto scaling policies
  - **Dynamic Scaling Policies**
    - work by monitoring a CloudWatch alarm
    - **Simple Scaling Policies**
      - increse instances **whenever the metric rises above the threshold**
      - cooldown period (300s as default) before applying the policy again
        - Auto scaling will not wait for the cooldown period to replace unhealthy instances
      - Ajustment Types
        - **ChangeInCapacity**
          - increase the capacity by a specific amount
        - **ExactCapacity**
          - set the capacity to the desired capacity
        - **PercentChangeInCapacity**
          - increase the capacity by a percentage of the current amount
          - e.g. if the current desired capacity is 4 and the percentage is set to 50% then Auto Scaling will increase the desired capacity to 6
    - **Step Scaling Policies**
      - increase instances based on how much the aggregate metric exceeds the threshold
      - e.g. average CPU utilization
        - 50% <= average CPU utilization < 60%: add more 2 instances
        - 60% <= average CPU utilization: add more 4 instances
      - step adjustments
        - a lower bound
        - an upper bound
        - the adjustment type
        - the amount by which to increase the desired capacity
      - warm-up time (300s as default) to wait for aggregating the new metrics
    - **Target Tracking Policies**
      - specify a metric and target value
      - Auto Scaling will create a CloudWatch Alarm and scaling policy to adjust the number of instances to keep the metric near that target
- **Scheduled Actions**
  - min, max, or desired capacity
  - start date and time

# Containers

## EKS; Amazon Elastic Kubernetes Service

- Amazon EKS Distro
  - freely available package you can download to build EKS-compatible environments of your own
  - make it easy to closely control the versions and environment dependencies

- underlying services
  - EC2
  - AWS Fargate

# Storage

## S3

- 100 buckets/account by default
- individual uploads is up to 5 GB
  - -> Multipart Upload
    - automatically applied when using AWS CLI or a high-level API
### Encryption

- unless it's intended to be publicly available, data stored on S3 should always be encrypted
- Server-Side Encryption
  - **Amazon S3-Managed Keys (SSE-S3)**
    - AWS uses its own enterprise-standard keys
  - **AWS KMS-Managed Keys (SSE-KMS)**
    - SSE-S3 + full audit trail for tracking key usage using *envelop key*
    - customer keys imported to AWS KMS is available
  - Customer-Provided Keys (SSE-C)
    - customer keys for S3 applied
- Client-Side Encryption
  - **AWS KMS-Managed Customer Master Key (CMK)**
  - *Client-Side Master Key*

### Logging

- S3 generated logs include
  - accout and IP address of the requestor
  - source bucket name
  - action that was requested (GET, PUT, POST, DELETE, etc.)
  - time the request was issued
  - response status (including error code)

### Durability

- S3 automatically replicate data across at least three AZs
  - except S3 One Zone-IA

### Availability

- S3 Standard
  - 99.99 %
- S3 Standard-IA (Infrequent Access)
  - 99.9 %
- S3 One Zone-IA
  - 99.5 %
- S3 Intelligent-Tiering
  - 99.9 %

### Access Control

- S3 bucket policies
  - Statement
    - Effect
      - Allow
      - Deny
    - Principal (Actor)
    - Action
      - e.g. s3:PutObject
    - Resource
      - bucket ARN (glob using object prefix available)
- IAM policies
- Amazon S3 Access Points
  - hostname that can point to a defined subset ob objects in a bucket
- ACL
  - deprecated

### Presigned URLs

- authentication (session) period: 10m (600s)
- URL expiration: 1h (3600s) by default

## Amazon S3 Glacier

- Glacier Instant Retrieval
- Glacier Flexible Retrieval
- Deep Archive
  - data retrieval will take up to 12h

## EFS; Elastic File System

- automatically scalable and shareable file storage to be accessed from **Linux instances**
- make it easy to enable **secure, low-latency, and durable file sharing amoung multiple instances**
- access files
  - VPC -> NFS on EC2
  - on-premises servers -> AWS Direct Connect

## Amazon FSx

- FSx for Lustre
  - open source distributed filesystem built to give Linux clusters access to **high-performance filesystems for use in compute-intensive operations**
- FSx for Windowns File Server
  - Server Message Block (SMB)
  - NTFS
  - Microsoft Active Directory
- FSx for OpenZFS
- FSx for NetApp ONTAP

## AWS Storage Gateway

- local device -> Storage Gateway appliance -> cloud storage (e.g. S3, EBS)
  - enable to use cloud storage as local storage
- appliance
  - VMware ESXi
  - Microsoft Hyper-V
  - Linux KVM
  - VMware Cloud on AWS
  - EC2 images

# Network

private IPs
- **10.0.0.0/8 (10.0.0.0 - 10.255.255.255)**
- **172.16.0.0/12 (172.16.0.0 - 172.31.255.255)**
- **192.168.0.0/16 (192.168.0.0 - 192.168.255.255)**

## VPC

- IPv4 VPC CIDR range: **/16 - /28**
- primary CIDR block does NOT editable
- IPv6 VCP CIDR rang: **/56**
- if a VPC is created, **AWS automatically creates a default route table (main route table) and associates it with every subnet in that VPC**
- contains a default security group that can't be deleted
- contains a default NACL that can't be deleted

## Subnet

- A subnet can exist within only one AZ
- **must have at least one route table**
- **every instance must exist within a subnet**
  - can't move the instance to aother subnet; need to terminate then recreate in another subnet
- the first 4 and last IP are reserved by AWS
  - e.g. 172.16.100.0/24
    - 172.16.100.0
    - 172.16.100.1
    - 172.16.100.2
    - 172.16.100.3
    - 172.16.100.255
- can have only one NACL
- if a subnet is created in a VPC, the VPC's default NACL is associated with it by default

## Internet Gateway

- performs NAT for instances that have a public IP address
- **must create a default route in a route table that points to the internet gateway**

## Route Tables

- control traffic in VPC
  - as separate virtual router with a connection to one or more subnets
- each route table consists of **one or more routes** and **at least one subnet association**
- every route table contains **a local route that allow instances in different subnets to communicate with each other**
  - Routes
    - Destination IP prefix
    - Target resource
      - AWS network resource
      - Internet gateway
      - ENI

|Destination|Target|
|:---:|:---:|
|172.31.0.0/16|Local|
|0.0.0.0/0|igw-0e538022a0fddc318|

## NACL; Network Access Control List

- *stateless* firewall attached to a **subnet**
- inbound rules
  - ascending order of the rule number

|Rule number|Protocol|Port range|Source|Action|
|:---:|:---:|:---:|:---:|:---:|
|90|TCP|80|0.0.0.0/0|Deny|
|100|All|All|0.0.0.0/0|Allow|
|*|All|All|0.0.0.0/0|Deny|

- outbound rules
  - to maintain compatibility, do not restrict outbound traffic using an NACL; use a security group instead
- avoid changing security groups and NACLs simultaneously

## AWS Network Firewall

- a scalable firewall to protect multiple VPCs and subnets, even across different AWS accounts
- web filtering
- intrusion detection and prevention
- stateless and stateful packet filtering
- centralized visibility of all traffic

## EIP; Elastic IP Address

- BYOIP; bring your own IP address

## AWS Global Accelerator

- provides 2 anycast static IPv4 addresses
  - route traffic to resources in any region
    - AWS points-of-presence (POPs) in over 30 countries
- routes traffic to the fastest endpoint

## NAT; Network Address Translation

- **NAT gateway**
  - automatic
    - managed by AWS
  - can't apply a security group
  - apply an NACL to the subnet that it resides in
- NAT instance
  - manual
  - an EC2 instance using preconfigured Linux-based AMI
  - **source/destination check on the ENI must be disabled**
    - to allow the instance to receive traffic not destined for its IP and to send traffic using a source address that it doesn't own
  - bastion host (jump host)
    - connect to instance that don't have public IP
  - not often used recently

## AWS PrivateLink

- connect VPC resources, AWS services, and on-premises resources to each other bypassing the Internet
- reliable
- low-latency

## VPC Peering

- connect instances in one VPC to VPCs in another using AWS PrivateLink
  - different regions
  - another AWS customer's instances
- point-to-point connection between two and only two VPCs
- must not overlapping CIDR blocks
- instance-to-instance communication

## Hybrid Cloud Networking

- VPN; AWS Site-to-Site Virtual Private Network
- AWS Transit Gateway
- AWS Direct Connect

### VPN

- connect a VPC to an on-premises network
  - establish encrypted VPN tunnel
    - VPC: virutal private gateway
    - on-premises: customer gateway

### AWS Transit Gateway

- connect **multiple VPCs and on-premises networks** via Direct Connect links or virtual private networks
- attached to VPC, VPC connection, Direct Connect gateway or another transit gateway
- Transit Gateway Route Table
  - control traffic among VPCs and on-premises networks
  - can't specify an ENI or Internet gateway as a target
- use cases
  - **Centralized router**
  - **Isolated router**
  - **Shared services**
  - **Tansit Gateway Peering**
    - even different regions
  - **Multicast**
    - specify the ENI of an instance that will server as the multicast source (multicast group)
    - sender must be Nitro instance
  - **Blackhole Routes**
    - transit gateway drops any traffic that matchies the routes
  
### AWS Direct Connect

- uses PrivateLink
- not encrypted
  - but TLS used
- **bypass the Internet**
  - use cases
    - **transfer large data sets**
    - **transfer real-time data**
    - **regulatory requirements that preclude transferring data over the Internet**
- connection types
  - **Dedicated**
    - single physical connection that terminates at an AWS Direct Connect location
    - network speed
      - 1 Gbps
      - 10 Gbps
      - 100 Gbps
  - **Hosted**
    - 50 Mbps - 10 Gbps
- Direct Connect Gateways
  - global resource that provides a single connection point to multiple VPCs in a region
  - e.g. AWS Transit Gateway, virtual private gateway
- VIF; Virtual Interface
  - Private Virtual Interface
    - connect to the private IP addresses of resources in a single VPC
      - e.g. EC2, RDS instance
  - Public Virtual Interface
    - connect to public IP addresses of AWS services
      - e.g. S3, DynamoDB
  - Transit Virtual Interface
    - connect one or more AWS transit gateways
    - network speed >= 1 Gbps
- Direct Connect SiteLink
  - connect 2 on-premises sites using Direct Connection

## AWS Parallel Cluster

- automatically manage Linux-based HPC cluster
  - provision cluster instances
  - create a 15 GB shared filesystem (NFS, EFS, or FXs for Lustre)
    - stored on an EBS volume that's attached to a master instance
  - create a batch scheduler using AWS Batch

### EFA; Elastic Fabric Adapter

- allow HPC applications to use the Libfabric API to bypass the OS's TCP/IP stack and access the EFA directly
  - more thoughput
  - reduce latency
- all attached instances must be
  - in the same subnet
  - attached to the same security group that allows all traffic to and from it

## ELB; Elastic Load Balancer

- application
- network

# Security

## WAF; Web Application Firewall

- only for application load balancers and CloudFront distributions
- source IP address
- geographic location
- XSS
- SQL injection
- including AWS Shield Advanced at no charge

## AWS Shield

- DDoS
- Standard
  - activated by default for all AWS customers
- Advanced
  - HTTP flood attacks

## Amazon Inspector

- rules packages
  - Security Best Practice
    - Linux only

- NCLs and security groups cannot be used for public endpoints
