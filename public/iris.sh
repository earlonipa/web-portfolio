#!/bin/bash

# 1. Quietly install the IRIS Clarity macOS package
# Replace <path_to_package> with the actual path to your downloaded iris_clarity.pkg file
sudo installer -pkg "<path_to_package>" -target /

# 2. Inject the Station License Key into the system configuration path
# Replace XXX-XXX-XXX-10-V3 with your actual license key from the dashboard image
TARGET_DIR="/Users/Shared/Library/Application Support/IRIS_Clarity"
mkdir -p "$TARGET_DIR"

# Write the configuration file containing the key
echo '{ "license_key": "XXX-XXX-XXX-10-V3" }' > "$TARGET_DIR/AppConfig.json"

# Set permissions so the station users can access the configuration file
chmod -R 775 "$TARGET_DIR"