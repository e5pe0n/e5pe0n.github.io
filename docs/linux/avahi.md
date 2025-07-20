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

# Client PC (SSHing PC)

replace `<username>` with username of the user of the server pc and `<hostname>` with confirmed one at previous step.

```sh
ssh <username>@<hostname>
```

enter password of the user of the server pc when asked.
