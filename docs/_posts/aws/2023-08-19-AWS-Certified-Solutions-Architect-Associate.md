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

ensure compliance with corporate standards

- take templates (e.g. CloudFormation template, prebuilt machine images, etc.) and use it to make exactly resources you approve available to exactly the users you designate
- set availability and cunsumption limits

## AWS License Manager

manage software licenses

- License Management dashboard
  - tracking usage
  - monitoring compliance
  - enforce applicable rules
- on-premises software also available

# Security, Identity and Compliance

## AWS Artifact

digital repository that allows customers to download compliance-related information about their AWS accounts and services
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
  - $29/month or 3% of monthly AWS charge
  - **one account holder**
  - system impaired response
  - limited general guidance
- Business Plan
  - $100/month or 10% of monthly AWS charge (up to $10,000)
  - **unlimited users**
  - faster guaranteed response for impaired system
  - personal guidancel
  - troubleshooting
  - support API
- Enterprise On-Ramp
  - $5,500/month or 10% of monthly AWS charge
  - fast response for business-crutial system down events
  - proactive guidance
  - consultative review
- Enterprise
  - $15,000/month
  - AWS solutions architects for operational and design reviews
  - technical account manager
  - online self-paced labs

# Migration & Transfer

## AWS Migration Hub

dashboard about migrations

## AWS Application Migration Service

automates the testing and transfer of AWS-bound migration of non-cloud application servers

- install AWS Replication Agent on the servers to be migrated
- CloudEndure
  - AWS tool to automate migrations to AWS GovCloud or China Region

## AWS Database Migration Service

- need to provide accessable database endpoints
- could convert
  - RDB -> data lake that lives in S3
  - Oracle DB -> AWS Aurora DB

## AWS Application Discovery Service


# Data Storage

## S3

- encryptions

## EFS; Elastic File System

# Network

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
