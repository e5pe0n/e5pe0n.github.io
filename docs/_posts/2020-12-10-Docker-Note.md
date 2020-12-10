---
title: "Note: Docker"
categories:
  - Note
tags:
  - Docker
---


# run
`docker run --privileged -d -ti -p 80:80 --name <container_name> -v <local_directory>:<container_directory> -w <working_directory_in_container> <image_name> /sbin/init`  
`working_directory_in_container` is a first directory when login.  
if not found `image_name`, install the image from docker hub automatically.
`/sbin/init` is needed to user `systemctl`


# CentOS7
- Install
  - `$ sudo yum update`
  - `$ suod yum gruop install -y "Development Tools"`
  - firewalld
  - less
  - vim
  - iputils
    - ping
    - traceroute
  - lsof
  - java-1.8.0-oepnjdk-devel
  - openssl
  - openssh-server
  - openssh-clients
- Settings
  - ~/.bashrc
    - `alias ls='ls --color=auto'`


  # Amazon Linux 2
  - `$ docker run --privileged -d -ti -p 58080:8080 --name devamazonlinux2 -v /Users/<user_name>/Docker/20190824_amazonlinux2:/home/20190824_amazonlinux2 -w /home/20190824_amazonlinux2 amazonlinux`
  - @container: `# yum install -y systemd `
  - `$ docker commit <container_id> <image_name>:<tag>`
  - `$ docker stop devamazonlinux2`
  - `$ docker rm devamazonlinux2`
  - `$ docker run --privileged -d -ti -p 58080:8088 --name devamazonlinux2 -v /Users/<user_name>/Docker/20190824_amazonlinux2:/home/20190824_amazonlinux2 -w /home/20190824_amazonlinux2 <image_name>:<tag> /sbin/init`
  - `# yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm` : corresponding with `rpel-release`
  - VSCode
    - Install: `# yum install -y`
      - `tar` : be needed to attach VScode Container
      - `java-1.8.0-devel` : java11 for amazon linux is comming some time
    - Extension
      - Java Extension Pack
        - Java Test Runner
        - Java Dependency Viewr
      - Spring Boot Tools
      - Spring Initializr Java Support
      - Lombok Annotations Support for VS Code

# BusyBox
`$ docker run -ti -v <local_directory> --name <container_name> busybox /bin/sh` : Not `/bin/bash`

# MySQL
- latest version (>= 8.0) doesn't allow native authentication
-> `$ vim <local_directory>/my.cnf` : 
```my.cnf
[mysqld]
default-authentication-plugin=mysql_native_password
```
-> `$ docker run -v <local_directory>:/etc/mysql/conf.d --volumes-from mysql_demo_data --name mysql_demo -e MYSQL_ROOT_PASSWORD=mysql -d -p 53306:3306 msyql:latest`  
-> `$ docker start mysql_demo`

## Login
- from local PC  
`$ mysql -uroot -p`  

- from other cotainers  
`$ mysql -uroot -h172.17.0.3 -p`

## Create Database
`mysql > create database test_db`

## Spring Boot
```application.properties
// application.properties
spring.datasource.url=jdbc:mysql://localhost:53306/test_db
spring.datasource.username=root
spring.datasource.password=mysql
spring.jpa.hibernate.ddl-auto=update
```
`$ docker run --volumes-from mysql_demo_data --name mysql_demo -e MYSQL_ROOT_PASSWORD=mysql -d -p 53306:3306 mysql:latest`


# Docker Compose
## Pre-process
- `$ docker run --privileged -d -ti --name <tmp_container_name> amazonlinux:latest`
- login container and execute : `# yum install -y systemd `
- `$ docker commit <tmp_container_name> <new_image_name>:<tag>`
- `$ docker stop <tmp_container_name>`
- `$ docker rm <tmp_container_name>`


## Example

```
amazonlinux.d
 + Dockerfile
 + docker-compose.yml
 + web_server_main.d/
 + web_server_sub1.d/
 + db_config.d/
    + my.cnf
 + db_data.d/
```

Dockerfile
```
FROM amazonlinux:latest
RUN yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm\
    && yum groupinstall -y "Development Tools"\
    && yum install -y tar java-1.8.0-openjdk-devel vim less lsof mysql
CMD ["/sbin/init"]
```
my.cnf
```
[mysqld]
default-authentication-plugin=mysql_native_password
```

docker-compose.yml
```yml
version: '3'
services:

  web_server_main:
    image: tmp-amazonlinux2:3
    container_name: web_server_main
    ports:
      - 58082:8080
    privileged: true
    volumes:
      - /Users/tsubasa/tmp/20190901_docker/web_server_main.d:/home/web_server_main.d
    working_dir: /home/web_server_main.d

  mysql:
    image: mysql:latest
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: mysql
    volumes:
      - /Users/tsubasa/tmp/20190901_docker/db_data.d:/var/lib/mysql
      - /Users/tsubasa/tmp/20190901_docker/db_config.d:/etc/mysql/conf.d

  web_server_sub1:
    image: tmp-amazonlinux2:3
    container_name: web_server_sub1
    ports:
      - 58083:8080
    privileged: true
    volumes:
      - /Users/tsubasa/tmp/20190901_docker/web_server_sub1.d:/home/web_server_sub1.d
    working_dir: /home/web_server_sub1.d
```
