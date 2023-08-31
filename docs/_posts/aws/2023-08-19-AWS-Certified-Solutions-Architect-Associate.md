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

### Security Groups

- firewall for an EC2 instance (**instance level traffic control**)

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


# Data Storage

## S3

- encryptions

## EFS; Elastic File System

# Network

private IPs
- 10.0.0.0/24 (10.0.0.0 - 10.255.255.255)
- 172.16.0.0/17 (172.16.0.0 - 172.31.255.255)
- 192.168.0.0/16 (192.168.0.0 - 192.168.255.255)

2^4
2^5kkk
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
