# Certified Solution Architect Associate


## Architecture Pillars

- resilience architectures

|Availability Percentage|Time Unavailable|
|:---:|:---:|
|99%|3d 15h 39m|
|99.9%|8h 45m|
|99.95%|4h 22m|
|99.99%|52m|
|99.999%|5m|

- high-performancing architectures
- secure architectures
  - confidentiality
    - the only people or systems that can access data are those authorized to access it
      - encryption
      - access control
  - integrity
    - cryptographic hashing
    - logging
  - availability
- cost-optimizing architectures

---

## Management & Governance

### AWS Organizations

organize multiple resources, accounts, account groups, etc.

- share resources through a unified **AWS Single Sign-on configuration** that applies global permissions to all your accounts
- apply IAM rules globally through SCPs (service control policies)
- create and manage accounts along with account users and groups programmatically
- audit, monitor, and secure all your environments for compliance and functional purpose. a single account's CloudTrail can be configured to watch events from your entire organization

### AWS Control Tower

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

### AWS Servicee Catalog

ensure **compliance** with corporate standards

- take templates (e.g. CloudFormation template, prebuilt machine images, etc.) and use it to make exactly resources you approve available to exactly the users you designate
- set availability and cunsumption limits

### AWS License Manager

manage **software licenses**

- License Management dashboard
  - tracking usage
  - monitoring compliance
  - enforce applicable rules
- on-premises software also available

### SSM; AWS Systems Manager

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

#### Automation

- e.g.
  - restart multiple EC2 instances
  - update CloudFormation stacks
  - patch AMIs

#### Run Command

- install an agent into an instance and on-premises managed instance then run command
- need to apply an instance profile role that contains the permissions in the AmazonSSMManagedInstanceCore policy

#### Session Manager

- keep a log of all logins in CloudTrail
- store a record of commands run within a session in an S3 bucket

#### Patch Manager

- patch baselines
  - which available patches to install
  - whether the patches will be install automatically or require approval
- auto-approval delay (except Ubuntu)
  - 7 days

#### State Manager

- configuration management tool that ensure your instances have the software you want them to have and configured in the way you define
- create *association* that defines
  - the command document to run
  - parameters
  - target instances
  - schedule

#### AWS System Manager Inventory

collect and aggregate metadata from instances

- *inventory association*
  - all instances in your account: *global inventory association*
  - select instance manually
  - by tag
- Inventory collect data at least **every 30 minutes**


### CloudTrail

- event
  - record of an action that a *principal* performs against an AWS resource
  - types
    - Managenmet Events (control plain operations)
      - Write-Only Events
        - e.g. create a new instance, login into the management console
      - Read-Only Events
        - e.g list instances
    - Data Events (data plain operations)
      - Write-Only Events
        - e.g.
          - S3: DeleteObject, PutObject
          - Lambda executions
      - Read-Only Events
        - e.g. S3: GetObject
      - limited to selecting a total of **250 individual objects per trail**, including Lambda functions and S3 buckets and prefixes
- action
  - API
    - e.g. launching an instance, creating a bucket in S3, creating a VPC
  - non-API
    - e.g. login into the management console
- **Event History**
  - logs **90 days** of **management events** and store them in event history by default
  - global services events logged in event history of every region
    - e.g. IAM, CloudFront, Route 53
- Trails
  - configuration that recourds specified events and delivers them as CloudTrail log files to an S3 bucket
  - CloudTrail log file
    - eventTime
    - userIdentity
    - eventSource
    - eventTime
    - eventName
    - awsRegion
    - sourceIPAddress
  - up to **5 trails for a single region**
  - **can't send log events larger than 256 KB to CloudWatch Logs**
- Log File Integrity Validation
  - if enabled, every time CloudTrail delivers a log file to the S3 buckets, it calculates a cryptographic hash of the file
  - every hour, CloudTrail creates a separate file: **digest file** that contains the **cryptographic hashes of all log files delivered within the last hour**
  - keys to encrypt
    - SSE-S3 by default
    - SSE-KMS
    - CMK
      - CMK must be in the same region as the bucket

### CloudWatch

- metrics
  - e.g. EC2 instance CPU utilization, EBS volume read and write IOPS, S3 bucket sizes, DynamoDB consumed RCUs and WCUs
    - data points
      - timestamp, value, unit
    - dimension (legend)
      - name/value pair
  - regular-resolution metrics
    - timestamp resolution is no less than one min
  - high-resolution metrics
    - less than one min
    - expiration
      - **after 3 hours**, aggregated into a single **one-minute resolution**
        - high-resolution metrics expire and are deleted
      - **after 15 days**, aggregated into a single **5-minute resolution**
      - **after 63 days**, aggregated into a single **1-hour resolution**
      - **after 15 months**, deleted
- monitoring
  - Basic monitoring
    - sends metrics to CloudWatch every 5 min
  - Detailed monitoring
    - every min
- CloudWatch Logs
  - stores log events from the same source in a *log stream*
  - **can manually delete log streams, but not individual log events**
  - organizes log streams into *log groups*
    - a log stream can exist in only one log group
  - retention period
    - 1 days - 10 years or indefinitely (by default)
  - can manually export a log group to an S3 bucket
- CloudWatch Agent
  - a command line-based program that collects logs and metrics from instances and on-premises severs running Linux or Windows
- CloudWatch Alarms
  - percentile for statistic
    - .5 (p50) <=: need `10/(1 - percentile)` data points
      - e.g. for p80, `10/(1 - 0.8) = 50` data points needed
    - < .5 (p50): need `10/percentile` data points
      - e.g. for p25, `10/(.25) = 40` data points needed
  - threshould
    - Static Threshould
    - Anomaly Detection
    - Metric Math Expression
  - alarm states
    - ALARM
    - OK
    - INSUFFICIENT_DATA
  - evaluation period
    - <= 24 hours
  - missing data
    - As Missing
      - default
    - Not Breaching
    - Breaching
    - Ignore
  - actions
    - Notification Using Simple Notification Service
      - protocol
        - HTTP/HTTPS, SQS, Lambda, a mobile push notification, email, email-JSON, SMS
    - Auto Scaling Action
    - EC2 Action


### AWS Config

- configuration recorder
  - **only one configuration recorder per region**
  - Configuration Item
    - specific settings for the resource at a point in time
    - e.g. resource type, ARN, when it was created, relationships to other resources
    - **can't delete manually**
  - Configuration History
    - collection of configuration item
    - evenry 6 hours in which a change occurs to a resource, delivers a configuration histry file to an S3 bucket
  - Configuration Stanpshots
    - collection of all configuration items from a given a point in time
- Recording Software Inventory
  - EC2 instances and on-premises servers
    - Applications
    - AWS components
      - e.g. CLI, SDKs
    - OS name and version
    - IP address, gateway and subnet mask
    - Firewall configuration
    - Windows updates
  - need to
    - enable inventory collection for the server using the AWS System Manager (SSM)
    - AWS Config monitors the SSM: ManagedInstanceInventory resource type


### AWS Trusted Advisor

- quick view of how closely account configurations are currently following AWS best practices
- categories
  - Const Optimization checks
  - Performance checks
    - e.g. excessive use of EBS mangnetic volumes
  - Security checks
  - Fault Tolerance checks
  - Service Limits checks

### AWS Compute Optimizer

- analyze all the compute resources running on account based on the previous 14 days
- identify improvements and potential savings
- cost is included in ongoing compute and CloudWatch fees

## Security, Identity and Compliance

### IAM; AWS Identity and Access Management

- Principals
  - root user
  - IAM user
  - IAM role

:::caution

IAM groups are not a principal.

:::


- IAM Policies
  - elements
    - Effect
      - allow
      - deny
    - Action
      - e.g. create buckets
    - Resources
      - e.g. s3
    - Condition
  - types
    - AWS Managed Policies
      - single identity can have <= 10 managed policies
    - Customer-Managed Policies
      - IAM doesn't overwrite existing policy but create a new version and maintains the last 5 versions
    - Inline Policies
- lock down root user
  - **delete any access keys associated with root user**
  - assign a long and complex password and store it in a secure password vault
  - enable MFA for the root user
  - wherever possible, don't use root user to perform administration oeprations
- Access Keys
  - can enforce key rotaion by password policy
- Roles
  - trusted entities
    - AWS service
    - another AWS account
    - web identity who authenticates using a login with **Amazon, Amazon Cognito, Facebook, or Google**
    - SAML (Security Assertion Markup Language) 2.0 federation with a SAML provider
  - when a trusted entity **assumes its new role, a time-limited security token is issued by AWS Security Token Service (STS)**
- Password Policy
  - password complexity requirements
    - min length (<= 6)
    - use of lower and upper case
    - numbers
    - nonalphanumeric chars
  - password expiration
  - preventing password reuse
  - requiring an administrator to reset an expired password

### Amazon Cognito

- **user pools**
  - **add user sign-up and sign-in to application**
  - mininum requirements for **password complexity, MFA, email verification**
- **identity pools**
  - **give application users temporary, controlled access to other services in AWS account**
  - create and assign an IAM role to the identity pool
    - any identified users will have access to the resources specified in the role

### AWS Managed Microsoft AD

- accessed through AWS Directory Service
- can connect AWS services to an on-premises Microsoft Active Directory using AD connector

### AWS Single Sign-On

- authentication and authorization through an existing Microsoft Active Directory configured within AWS Directory Service
- works across multiple AWS accounts within AWS Organizations
- support access to popular apps
  - **Salesforce**
  - **Box**
  - **Office 365**
  - **custom apps spporting SAML 2.0**


### AWS CloudHSM

- HSM; hardware security module
- launches virtual compute device clusters to perform cryptographic operations
- off-load the burden of generating, storing, and managing cryptographic keys from web servers
- useful for
  - **keys stored in dedicated, 3rd-party validated HSMs under exclusive control**
  - **FIPS (Federal Infomation Processing Standards) 140-2 compliance**
  - integration with apps using
    - **PKCS #11 (Public Key Cryptography Standsrds)**
    - **Java JCE (Java Cryptography Extension)**
    - **Microsoft CNG (Cryptography API: Next Generation)**
  - **high-performance in-VPC cryptographic acceleration (bulk crypto)**


### AWS RAM; AWS Resource Access Manager

- safely **share resources with users in multiple accounts within a single organization or even with external AWS accounts**

### AWS Artifact

digital repository that allows customers to download **compliance-related information** about their AWS accounts and services
- compliance reports
- security audit information
  - AWS Service Organization Control (SOC) reports
  - Payment Card Industry Data Security Standard (PCI DSS) reports
  - ISO 27001 certifications

### Amazon GuardDuty

- **inspects network traffic to and from instances**
  - analyzes
    - VPC flow logs
    - CloudTrail management event logs
    - Route53 DNS query logs
  - looks for known malicious IP addresses, domain names, and potentially malicious activity

#### findings

- notification that details the questionable activity
- types
  - Backdoor
  - Behavior
    - an EC2 instance is communicating on a protocol and port that it normally doesn't or is sending an abnormally large amount of traffic to an external host
  - Cryptocurrency
  - Pentest
    - penetration test
  - Persistence
  - Policy
  - Recon
    - reconnaissance attack
  - ResourceConsumption
  - Stealth
    - password policy was weakend
    - CloudTrail logging was disabled or modified
    - CloudTrail logs were deleted
  - Trojan
  - UnauthorizedAccess

### Amazon Inspector

- agent-based service
- **looks for vulnerabilities on EC2 instances**
- rules packages
  - Common Vulnerabilities and Exposures
    - CVEs
    - Linux and Windows
  - Center for Internet Security Benchmarks
    - Linux and Windows
  - Security Best Practices
    - subset ot Center for Internet Security Benchmarks
    - Linux only
  - Runtime Behavior Analysis
    - Linux only
  - Network Reachability
    - VPC vulnerable

### Amazon Detective

- **takes information from VPC flow logs, CloudTrail, and GuardDuty and places this information into a graph database**
- visualize the graph model to correlate events to identify and investiagte suspicious or interesting activities against AWS resources

### Macie

- automatically locates and classifies sensitive data stored in S3 buckets and show how it's being used
- using ML

### Security Hub

- collects security information from such as Amazon Inspector, GuardDuty, and Macie
- asseses account against **AWS security best practices and PCI DSS (Payment Card Industry Data Security Standard)**

### Amazon Fraud Detector

- detects such as
  - seller fraud
  - fake accounts
  - online payment fraud
- using ML

### AWS Audit Manager

- generates audit reports

### WAF; AWS Web Application Firewall

- monitors HTTP/HTTPS requests to an application load balancer or CloudFront distribution
- inspect application traffic for malicious activity
  - **injection of malicious scripts**
  - **XSS**
  - **SQL injection**
  - **HTTP flood attack** with Lamba function
- can alos block traffic based on
  - source IP address patterns
  - geographic location

### AWS Shield

- protect DDoS
- types
  - AWS Shield Standard
    - against common Layers 3 and 4 DDoS attacks
      - SYN flood
      - UDP reflection attacks
    - **automatically activated for all AWS customers**
  - AWS Shield Advanced
    - against Layer 7
      - **HTTP flood attacks**
    - **include WAF at no charge**

### AWS Firewall Manager

- manages
  - security groups
  - AWS Network Firewalls
  - DNS firewall rules
  - AWS WAF rules
- enforce particular security configurations globally
- monitor and report whether a resource is out of compliance

### Key Management Service

- Customer-managed CMK
  - key policies
    - who may use the key
- AWS-managed CMK
  - automatically rotates once a year
  - can't disable, rotate, or revoke it

## Customer Enablement

### Support

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

## Migration & Transfer

### AWS Migration Hub

dashboard about migrations

### AWS Application Migration Service

automates the testing and transfer of AWS-bound migration of non-cloud application servers

- install **AWS Replication Agent** on the servers to be migrated
- CloudEndure
  - AWS tool to automate migrations to AWS GovCloud or China Region

### AWS Database Migration Service

- need to provide accessable **database endpoints**
- could convert
  - RDB -> data lake that lives in S3
  - Oracle DB -> AWS Aurora DB

### AWS Application Discovery Service

collect information to plan the right migration strategy

- need to install **Application Discovery Agents** on on-premises servers

### AWS Snow Family

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

### AWS DataSync

- on-premises data stores ->
  - S3, Glacier, EFS, FSx, RDS (with AWS Database Migration Service)
- transfer rate: 10 Gbps
- **encryption**
- data validation

### AWS Transfer Family

- transfer data into and out of S3 and EFS
  - FTP; File Transfer Protocol
  - SFTP; Secure Shell (SSH) File Transfer Protocol
  - FTPS; File Transfer Protocol over SSL
- use cases
  - migrate on-premises data to AWS infra using common tools such as FileZilla, OpenSSH, and WinSCP

## Compute

### EC2; Elastic Compute Cloud

#### AMI; Amazon Machine Image

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
  

#### Instance Types

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

#### Tenancy

- shared tenancy (default)
- Dedicated Instance
  - isolate from other customer organizations' accounts
- Dedicated Host
  - identify and control the physical server

#### Placement Groups

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

#### Service Limits

by default, one account can have

- 5 VPCs per region
- 5,000 SSH key pairs

#### EBS Volumes; Elastic Block Store Volumes

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

- how to generate AMI from EBS
  - **create snapshot**
    - -> **generate another volume then attach it to other instance**
    - -> **convert AMI image**
  - also can **generate AMI image directly**
- **automatically replicates volumes across multiple AZs in a region**
- backups
  - Amazon Data Lifecycle Manager
    - schedule creating snapshot -> S3
- **don't store application logs on EBS**
  - use CloudWatch Logs
- avoid RAID 1, RAID 5, RAID 6 for IOPS consumption
- **encrypt a volume when initially create it using KMS-managed key**
  - but cannot directly encrypt a volume created from an unencripted snapshot or unencrypted AMI
  - -> **must first create a snapshot of the unencrypted volume and then encrypt the snapshot**

#### Instance Store Volumes

**ephemeral** storage

- SSDs physically attached to the instance and connected via a fast NVMe (Non-Volatile Memory Express)
- the use of instance volumes is included in the price of the instance itself
- **for operations requiring low-latency access to large amounts of data that needn't survive a system failure or reboot**
  - import disposable data from external sources

#### ENI; Elastic Network Interfaces

- primary ENI
  - the first ENI attached to an instance
  - can't remove the primary ENI from an instance, and can't change it's subnet
  - primary IP address of an instance is bound to a primary ENI
    - can't change or remove the address
- any address assigned to the ENI must come from the CIDR of the subnet to which it is attached
- **must be associated at least one security group**
- additional ENI in a different subnet can be attached
- but must be in the same AZ as the instance

#### Enhanced Networking

higher network throughput speeds and lower latency than ENIs

- **ENA; Elastic Network Adapter**
  - throughput speeds up to 100 Gbps
  - Amazon Linux and Ubuntu AMIs enabled by default
- **VF; Intel 82599 Virtual Function Interface**
  - throughput speeds up to 10 Gbps
- **EFA; Elastic Fabric Adapter**

#### Security Groups

- *stateful* firewall for an EC2 instance (**instance level traffic control**) and ELB
  - when a security group allows traffic to pass in one direction, it allows reply traffic in the opposite direction
- attached to ENIs
- inbound rules
  - source IP
  - protocol
  - destination port range
- outbound rules

#### Auto Scaling

##### EC2 Launch Configs

- launch configurations
  - old fashion
  - only for Auto Scaling; **can't launch an instance manually using a launch configuration**
  - **not editable**
- launch templates
  - **versioned**
  - can launch an instance
  - can be created from a lanuch configuration

##### Auto Scaling Groups

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


#### RI; Reserved Instance

- Amazon EC2 Reserved Instance Marketplace
  - search by
    - tenancy (default or dedicated)
    - instance type
    - platform (OS)
- types
  - Standard RI
    - 75% off
  - Convertible RI
    - can exchange instance later as long as the new instance has equal or greater value than the original
    - 54% off
- payment option
  - All Upfront (the lowest price)
  - Partial Upfront
  - No Upfront (billed hourly)

#### Saving Plans

- Compute Savings Plans
  - < 65% off
  - for
    - EMR
    - ECS
    - EKS
    - Fargate
- EC2 Instance Plans
  - < 72% off

#### EC2 Spot Instances

- terms
  - Spot Price
  - Spot Instance Interruption
    - Terminate
    - Stop
    - Hibernate
  - Spot Instance Pool
  - Spot Fleet
  - Request Type
    - Request
      - a one-time instance request
    - Request And Maintain
      - to maintain target capacity using a fleet
    - Reserve For Duration
      - 1-6h

- request elements
  - AZ
  - total target capacity
    - max instances or vCPUs
  - AMI
  - instance type

## Containers

### EKS; Amazon Elastic Kubernetes Service

- Amazon EKS Distro
  - freely available package you can download to build EKS-compatible environments of your own
  - make it easy to closely control the versions and environment dependencies

- underlying services
  - EC2
  - AWS Fargate

## Storage

### S3

- 100 buckets/account by default
- individual uploads <= 5 GB
  - -> Multipart Upload
    - automatically applied when using AWS CLI or a high-level API
- Amazon S3 Transfer Acceleration
  - routing data through CloudFront edge locations

#### Encryption

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

#### Logging

- S3 generated logs include
  - accout and IP address of the requestor
  - source bucket name
  - action that was requested (GET, PUT, POST, DELETE, etc.)
  - time the request was issued
  - response status (including error code)

#### Durability

- S3 automatically replicate data across at least three AZs
  - except S3 One Zone-IA
- **S3 CRR; Cross-Region Replication**
  - automatically (asynchronously) sync contents of a bucket in one region with a bucket in a second region
  - low latency
  - realiability and durability

#### Availability

- S3 Standard
  - **99.99 %**
- S3 Standard-IA (Infrequent Access)
  - **99.9 %**
- S3 One Zone-IA
  - **99.5 %**
- S3 Intelligent-Tiering
  - **99.9 %**

#### Access Control

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

#### Presigned URLs

- authentication (session) period: 10m (600s)
- URL expiration: 1h (3600s) by default

### Amazon S3 Glacier

- Glacier Instant Retrieval
- Glacier Flexible Retrieval
- Deep Archive
  - data retrieval will take up to 12h

### EFS; Elastic File System

- automatically scalable and shareable file storage to be accessed from **Linux instances**
- make it easy to enable **secure, low-latency, and durable file sharing amoung multiple instances**
- access files
  - VPC -> NFS on EC2
  - on-premises servers -> AWS Direct Connect
- stored across multiple zones in a region
- to protect against data loss and corruption
  - back up individual files to an S3 bucket or another EFS in the same region
  - AWS Backup Service
    - schedule incremental backups of EFS
- can enable encryption when create it
  - KMS-CMK to encrypt files
  - EFS-managed key to encrypt filesystem metadata

### Amazon FSx

- FSx for Lustre
  - open source distributed filesystem built to give Linux clusters access to **high-performance filesystems for use in compute-intensive operations**
- FSx for Windowns File Server
  - Server Message Block (SMB)
  - NTFS
  - Microsoft Active Directory
- FSx for OpenZFS
- FSx for NetApp ONTAP

### AWS Storage Gateway

- local device -> Storage Gateway appliance -> cloud storage (e.g. S3, EBS)
  - enable to use cloud storage as local storage
- appliance
  - VMware ESXi
  - Microsoft Hyper-V
  - Linux KVM
  - VMware Cloud on AWS
  - EC2 images

## Network

- private IPs
  - **10.0.0.0/8 (10.0.0.0 - 10.255.255.255)**
  - **172.16.0.0/12 (172.16.0.0 - 172.31.255.255)**
  - **192.168.0.0/16 (192.168.0.0 - 192.168.255.255)**
- ICANN; Internet Corporation for Assigned Names and Numbers
  - IP
  - domain name hierarchy
- domain
  - one or more servers, data repositories, or other digital resources identified by a single domain name
- subdomains (hosts)
  - e.g. aws.amazon.com
- zone file
  - Name
  - TTL
  - Recourd Class
  - Recourd Type
    - A
      - maps a hostname to an IPv4 address
    - CNAME; canonical name
      - alias of a hostname
    - MX; mail exchange
      - maps a domain to specified message transfer agests
    - AAAA
      - maps a hostname to an IPv6 address
    - TXT; text
    - PTR; pointer
    - SRV
      - customizable record for service location
    - SPF; sender policy framework
    - NAPTR; name authority pointer
    - CAA; certification authority authorization
    - NS; name server
    - SOA; start of authority

### Amazon Route 53

- domain registration
  - transfer existing domain registration
    - unlock the domain transfer setting in the registerar's admin interface
    - request an authorization code
    - supply code to Route 53
  - leave domain with current registrar and manage DNS configuration using Route 53
    - copy the name server addresses included in Route 53 recourd set
    - paste them as the new name server values in registrar's admin interface
- DNS management
- availability monitoring (health checks)
- traffic management (routing policies)
  - Weighted Routing
  - Latency Routing
  - Failover Routing
  - Geolocation Routing
    - e.g. deliver web pages in customer-appropriate languages, restrict content to regions where it's legally permitted
  - Multivalue Answer Routing
    - combine a health check configuration with multivalue routing to make a deployment more highly available
    - <= 8 recourds can be pointed to parallel resources 
  - Geoproximity Routing
    - by geographic areas by relationship either to a particular longitude and latitude or to an AWS region

#### Route 53 Resolver

- manage bidirectional address queries between servers running in AWS account and on-premises resources

### Amazon CloudFront

- origins
  - S3
  - **AWS MediaPackage channel endpoint**
  - **AWS MediaStore container endpoint**
    - media-optimized storage service
  - **Application Load Balancer**
  - **Lambda function URL**
  - **Custom origin**
    - **HTTP server (even on-premises)**



### VPC

- IPv4 VPC CIDR range: **/16 - /28**
- primary CIDR block does NOT editable
- IPv6 VCP CIDR rang: **/56**
- if a VPC is created, **AWS automatically creates a default route table (main route table) and associates it with every subnet in that VPC**
- contains a default security group that can't be deleted
- contains a default NACL that can't be deleted

#### Subnet

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

#### Internet Gateway

- performs NAT for instances that have a public IP address
- **must create a default route in a route table that points to the internet gateway**

#### Route Tables

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

#### NACL; Network Access Control List

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

#### AWS Network Firewall

- a scalable firewall to protect multiple VPCs and subnets, even across different AWS accounts
- web filtering
- intrusion detection and prevention
- stateless and stateful packet filtering
- centralized visibility of all traffic

#### EIP; Elastic IP Address

- BYOIP; bring your own IP address

#### NAT; Network Address Translation

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

#### AWS PrivateLink

- connect VPC resources, AWS services, and on-premises resources to each other bypassing the Internet
- reliable
- low-latency

#### VPC Peering

- connect instances in one VPC to VPCs in another using AWS PrivateLink
  - different regions
  - another AWS customer's instances
- point-to-point connection between two and only two VPCs
- must not overlapping CIDR blocks
- instance-to-instance communication

#### Hybrid Cloud Networking

- VPN; AWS Site-to-Site Virtual Private Network
- AWS Transit Gateway
- AWS Direct Connect

#### VPN

- connect a VPC to an on-premises network
  - establish encrypted VPN tunnel
    - VPC: virutal private gateway
    - on-premises: customer gateway

#### AWS Transit Gateway

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
  
### AWS Global Accelerator

- provides 2 anycast static IPv4 addresses
  - route traffic to resources in any region
    - AWS points-of-presence (POPs) in over 30 countries
- routes traffic to the fastest endpoint

### AWS Direct Connect

- uses PrivateLink
- not encrypted
  - but TLS used
- **bypass the Internet**
  - use cases
    - **transfer large data sets**
    - **transfer real-time data**
      - low latency needed
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

### AWS Parallel Cluster

- automatically manage Linux-based HPC cluster
  - provision cluster instances
  - create a 15 GB shared filesystem (NFS, EFS, or FXs for Lustre)
    - stored on an EBS volume that's attached to a master instance
  - create a batch scheduler using AWS Batch

#### EFA; Elastic Fabric Adapter

- allow HPC applications to use the Libfabric API to bypass the OS's TCP/IP stack and access the EFA directly
  - more thoughput
  - reduce latency
- all attached instances must be
  - in the same subnet
  - attached to the same security group that allows all traffic to and from it

### ELB; Elastic Load Balancer

- application load balancer
  - HTTP/HTTPS
- network load balancer
  - TCP
  - integrated with
    - Auto Scaling
    - ECS
    - CloudFormation
- Gateway Load Balancer
  - 3rd-party virtual appliance supporting GENEVE protocol
  - operate on Layer 3 of the OSI model

## Database

- OLTP; Online Transaction Processing
  - for apps that read and write data frequently, on the order of multiple times per seconds
- OLAP; Online Analytic Processing
  - optimized for complex queries against large data sets
  - for data warehousing apps
    - aggregate multiple OLTP databases into a single OLAP database

### RDS

- MySQL
  - should use InnoDB with RDS-managed automatic backups
- MariaDB
  - MySQL replacement
  - InnoDB recommended
- Oracle
  - Oracle Database 21c
  - Oracle Database 19c
  - Oracle Database 12c Release 2
  - Oracle Database 12c Release 1
- PostgreSQL
  - Oracle compatible
- Amazon Aurora
  - editions
    - MySQL compatible
      - Aurora Backtrack
        - **restore database to any point in time within the last 72 hours**
    - PostgreSQL compatible
  - Amazon Aurora Serveless
    - automatically scale database up and down on-demand
- Microsoft SQL Server

#### Licence Considerations

- Licence Included
  - MySQL
  - MariaDB
  - PostgreSQL
  - Micresoft SQL Server
  - Oracle Database Standard Edition Two (SE2)
- BYOL; Bring Your Own Licence
  - Oracle Database Enterprise Edition (EE)
  - Oracle Database Standard Edition Two (SE2)

#### Database Option Groups

- S3 integration
  - Oracle
- TDE; Transparent Data Encryption
  - Microsoft SQL Server
  - Oracle
- audit plug-in
  - MySQL
  - MariaDB

#### Database Instance Classes

- Standard
  - memory: 512 GB
  - vCPU: 128
  - network bandwidth: 40 Gbps
  - disk throughput: 50,000 Mbps (6,250 MBps)
  - EBS optimized
- Memory Optimized
  - memory: 3,904 GB
  - vCPU: 128
  - network bandwidth: 25 Gbps
  - disk throughput: 14,000 Mbps (1,750 MBps)
  - EBS optimized
- Burstable Performance
  - for nonproduction databases
    - development, test
  - memory: 32 GB
  - vCPU: 8
  - network bandwidth: 5 Gbps
  - disk throughput: 2,048 Mbps (256 MBps)

#### Database Storage

- page size
  - the larger page size, the fewer IOPS you need to achieve the same level of throughput
  - 16 KB
    - MySQL
    - MariaDB
  - 8 KB
    - PostgreSQL
    - Microsoft SQL Server
    - Oracle
- storages
  - General-Purpose SSD (gp2)
    - storage size: 20 GB - 64 TB
      - if < 1 TB then temporarily burst to 3,000 IOPS
        - `burst duration in seconds = credit balance / [3,000 - 3 * (storage size in GB)]`
        - credit balance is replenished at a rate of one baseline IOPS every second
    - baseline IOPS: 3 IOPS/GB
    - IOPS: 60 - 16,000
    - e.g.
      - 2,000 Mbps throughput needed
      - page size is 16 KB (128 Kb or 0.128 Mb)
      - -> 2000 Mbps / 0.128 Mbs = 15,625 IOPS ~= 16,000 IOPS needed
      - -> 16,000 IOPS / 3 IOPS/GB = 5,334 GB ~= 5.33 TB storage size needed
  - Provisiond IOPS SSD (io1)
    - no bursting
    - IOPS: <= 256,000
    - storage size
      - MySQL, MariaDB, PostgreSQL, Oracle
        - 100 GB - 64 TB
    - `IOPS:storage size in GB` must be >= `50:1`
      - e.g. if 32,000 IOPS needed, at least 640 GB storage size needed
  - Magnetic Storage (Standard)
    - for backword compatibility; don't use this

#### Read Replicas

- data from the master is **asynchronously** replicated to each read replica
- DB engines
  - Microsoft SQL Server
    - only Enterprise Edition is supported
  - all other DB engines supported
    - **Autora: < 15 read replicas**
    - **others: < 5 read replicas**

#### Autora Multi-AZ Deployment

- Single-Master
  - primary and all replicas share a single cluster volume
    - **synchronously replicated across 3 AZ**
    - automatically provisioned up to 64 TB
  - if primary instance fails
    - if replicas exist
      - promote a replica to the primary
    - else
      - create a new primary instance
- Multi-Master
  - all instances share a single cluster volume
  - all instances can read and write
  - **no failover occurs**

#### Other DBs Multi-AZ Deployment

- deploy multiple database instances in different AZ  
  - primary database instance
  - standby database instance in different AZ  
    - **standby instance is not read replica**

- if primary instance experiences an outage, fail over to the standby instance, usually within 2 min  
  - AZ outage
  - changing a DB instance type
  - patching of the instance's OS  

- **primary and all standby instances must reside in the same region**
- synchronously replicates data from the primary to the standby instance
  - should use **EBS-optimized instances and provisioned IOPS SSD storage**
- multi-AZ read replica in different region
  - fail over to different region
  - MySQL, MariaDB


#### Automated Snapshots

- EBS snapshot
  - stored in S3 in multiple AZ in the same region
  - suspends all I/O operations for a few seconds unless using multi-AZ
    - **be sure to take snapshots during off-peak times**
  - created daily during a 30-min backup window
    - customize window
    - or RDS randomly select a 30-min window within an 8-hour block that varies by region
- point-in-time recovery
  - archives database change logs to S3 every 5 min
  - **restoring to a point-in-time can take hours**
  - retention period
    - time period keeping snapshots
    - 0 day - 35 days
      - setting 0 day disables automated snapshots
        - immediately deletes all existing automated snapshots and point-in-time recovery
    - 7 days by default

### Amazon Redshift

- mangaged data warehouse service based on PostgreSQL
- supported connectors
  - ODBC; Open Database Connectivity
  - JDBC; Java Database Connectivity
- Redshift Cluster
  - one or more **compute node**
    - **dense compute node**
      - storage: <= 326 TB
      - SSD
    - **dense storage node**
      - storage: <= 2 PB
      - HDD
    - **RA3 node**
      - storage: <= 16,384 TB
      - SSD
  - **leader node**
    - coordinate communication among the compute nodes, as well as to communicate with clients
    - no additional charges
- Data Distribution Style
  - AUTO distribution
    - default
  - EVEN distribution
  - KEY distribution
    - spreads the data according to the value in a single column
  - ALL distribution
    - distribute every table to every compute node

#### Redshift Spectrum

- query data from files stored in S3 without having to import the data into cluster
- the bucket must be in the same region as the cluster

### DynamoDB

- partition
  - 10 GB storage allocation for a table
  - hot partiion
    - a lot of read and write active occurs in the same partition
    - **make partition key as specific as possible**
- primary key
  - partition key (hash key)
    - e.g. email address, a unique username, uuid
    - 2 KB
  - sort key (range key)
    - composite primary key
    - 1 KB
- item
  - <= 400 KB
    - ~= 50,000 english words
- data type
  - Scalar
    - string
      - <= 400 KB
      - UTF-8 encoding
      - empty string not allowed
    - binary
      - <= 400 KB
      - Base-64 encoding
  - Set
  - Document
    - < 32 levels deep
- thoughput capacity
  - can switch only once every 24h
  - **on-demand mode**
    - automatically scales to accommodate workload
  - **provision mode**
    - provisioned throughput
      - RCUs; read capacity unites
        - **strongly consistent read**
          - **4 KB/RCU**
        - **eventually consistent read**
          - **8 KB/RCU**
      - **WCUs; write capacity unites**
        - **1 KB/WCU**
- Auto Scaling
  - min RCU and WCU
  - max RCU and WCU
  - desired utilization percentage
- Reserved Capacity
  - parchase RCUs and WCUs
    - 100 - 100,000
  - have to pay a one-time fee
  - commit to a period of 1 or 3 years
- Reading Data
  - scan operation
    - lists all items in a table
  - query operation
- Secondary Indexes
  - look up data by an attribute other than the primary key
  - base table
    - the table that the index gets its data from
  - projected attributes
  - always includes the partition and sort key attributes from the base table
  - types
    - **GSI; Global Secondary Index**
      - can create any time
      - the partition and hash keys can be different than the base table
      - eventually consistent read
    - **LSI; Local Secondary Index**
      - **must create at the same time as the base table**
      - cannot delete
      - **the partition key must be the same as the base table**
      - **the sort key can be different**
- Global Tables
  - replicate a table across multiple regions
  - must be configured in on-demand mode or provisioned mode with **Auto Scaling enabled**
  - only one replica table per region
- Backups
  - can back up tables at any time
    - not impact the performance

## Analytics

### AWS Lake Formation

- data lake
  - centralized database that collects and store massive amounts of structured and unstructured data from any number of places
- can search, analyze, visualize, and correlate data
- use AWS Glue to collect data
- use S3 to store data lekes
- FindMatches ML
  - help dedup data
- analytics
  - **Athena**
  - **QuickSight**
  - **RedShift Spectrum**
  - **Amazon EMR**
  - **AWS Glue**

### AWS Glue

- perform what database nerds call ETL operations
  - Extract data from
    - **S3**
    - **RDS**
    - **AWS CloudFront**
    - **AWS CloudTrail**
    - **ELB (AWS Elastic Load Balancer)**
    - **on-premises databases that supports JDBC**
  - Transform
    - format
    - combine
    - cleaning
      - eliminating dupulicate, corrupted, or otherwise undesireble data
  - Load
    - quickly find text
- based on Apache Spark
- AWS Blue Catalog
  - stores metadata and lables about data lake

### Kinesis

- collection of services that collect, process, store, and deliver streaming data

#### Kinesis Video Streams

- ingest and index streaming video data
  - e.g. webcams, security cameras, smartphones
- use cases
  - computer vision apps
    - e.g. image recognition
  - streaming video
  - 2-way videoconferencing
- producer-consumer model
- retention period
  - 24h by default
  - <= 7d
- supports
  - **HLS; HTTPS Live Stream**
  - **DASH; Dynamic Adaptive Streaming Over HTTPS**
  - **WebRTC; Web Real-Time Communication**

#### Kinesis Data Streams

- data pipeline that aggregate, buffer, and reliably store data from producers until a consumer is ready to process it
  - application logs
  - stock trades
  - social media feeds
  - financial transactions
  - location tracking information
- **Amazon Kinesis Agent**
  - stream server or application logs
  - java-based app that runs on Linux servers
- **KPL; Kinesis Producer Library**
  - send data directly from app into a Kinesis stream
- multiple consumers can read from a stream concurrently; fan-out
  - **one-to-many model**
- shards
  - read
    - **<= 5 transactions/sec**
    - **<= 2 MB/sec data rate**
  - write
    - **<= 1,000 records/sec**
    - **<= 1 MB/sec data rate**
- use cases
  - **stream data to a custom app**

#### Kinesis Data Firehose

- ingest streaming data and transform it before sending it to a destination
  - e.g. format data to Apache Parquet format then send it to Hadoop
- use Lambda functions to transform data
- can receive data from a Kinesis Data Stream
  - to retain data beyond the max retention period
  - **Kinesis Data Stream -> Kinessis Data Firehose -> S3**
- use cases
  - **stream data to services such as Redshift, S3, or Splunk**

|Service|Transforms Data|Default Retention|Maximum Retention|Model|
|:---:|:---:|:---:|:---:|:---:|
|Simple Queue Service|No|4d|14d|Producer-consumer|
|Kinesis Video Streams|No|24h|7d|Producer-consumer|
|Kinesis Data Streams|No|24h|365d|Producer-consumer|
|Kinesis Data Firehose|Yes||24h|Source-destination|


## Application Integration

### EventBridge

- takes some action based on specific events or on a schedule, not metric values
- Event Buses
- Rules
  - defines the action and the target to take in response to an event

### SQS; Simple Queue Service

- message
  - <= 256 KB
  - visibility timeout
    - 30s by default
    - 0s - 12h
  - retention period
    - 4d by default
    - 1m - 14d
  - per-queue delay
    - 0s by default
    - 0s - 15m
  - message timer
    - delay for individual messages
    - override per-queue delay
    - 0s by default
    - 0s - 15m
- types
  - Standard Queues
    - <= 120,000 in-flight messages
  - FIFO Queues
    - <= 3,000 messages/sec
    - <= 20,000 in-flight messages
- polling
  - short polling (default)
    - it's possible to get a false empty response even if there are messages
  - long polling
    - <= 20s to return a response
- resource-based SQS access policies
  - who can send to and receive messages from a queue

### SNS; Amazon Simple Notification Service

- topics
  - resource policies
    - control who can publish messages or subscribe to a topic

## AWS Cost Management

### AWS Budgets

- track ongoing resource-related usage and costs
- alert if projected usage levels fail outside of a predefined threshold
- *cost allocation tags*
  - take up to 24h before appear in the Billing and Const Management Dashbaord
  - can't be applied to resources that were launched before the tags were created

### AWS Cost Explorer

- visualize historical AWS usage and costs
- download data as CSV file

### AWS Cost and Usage Reports

- support
  - Athena
  - Redshift
  - QuickInsight
