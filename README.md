#twitterfeedservice

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;$ProgressPreference = 'SilentlyContinue'; $null = New-Item -Type Directory -Force $env:appdata/cockroach; Invoke-WebRequest -Uri https://binaries.cockroachdb.com/cockroach-v22.1.2.windows-6.2-amd64.zip -OutFile cockroach.zip; Expand-Archive -Force -Path cockroach.zip; Copy-Item -Force "cockroach/cockroach-v22.1.2.windows-6.2-amd64/cockroach.exe" -Destination $env:appdata/cockroach; $Env:PATH += ";$env:appdata/cockroach"

cockroach start-single-node --advertise-addr 'localhost' --insecure


Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

choco install rabbitmq --version 3.10.5 -y