using avahi, you can ssh to another pc in the same local network.

# Server PC (SSHed PC)

first install and enable ssh if not.

```sh
sudo apt-get install openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh
```

install and enable avahi.

```sh
sudo apt-get install avahi-daemon
sudo systemctl enable avahi-daemon
sudo systemctl start avahi-daemon
```

confirm the `hostname`.
it is like `<pc-name>.local`.

```sh
sudo systemctl status avahi-daemon
```

# Client Linux PC (SSHing Linux PC)

replace `<username>` with username of the user of the server pc and `<hostname>` with confirmed one at previous step.

```sh
ssh <username>@<hostname>
```

enter password of the user of the server pc when asked.

# Client MacOS PC (SSHing MacOS PC)

need to additional configuration to ssh from MacOS.

in the server pc, edit `/etc/avahi/avahi-daemon.conf` like below to advertize `_workstation._tcp` of the server pc.

```
publish-hinfo=yes
publish-workstation=yes
```

restart avahi-daemon

```sh
sudo systemctl restart avahi-daemon
```

check advertisements by

```sh
avahi-browse -at
```

you should see a line like below

```
eth0 IPv4 server-pc   _workstation._tcp  local
```

now you can ssh from client macos pc

```
ssh <username>@<hostname>
```

