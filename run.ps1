# Record the start time
$startTime = Get-Date

# Run your docker-compose command
docker compose up -d -V --build

# Record the end time
$endTime = Get-Date

# Calculate the time difference
$timeTaken = $endTime - $startTime

# Display the time taken
Write-Host "Time taken: $timeTaken"
