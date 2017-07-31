# StudentLife

problème config.g mutex =>
Running into the same issue here after upgrading from 0.44. None of the above solutions or clearing caches did the trick for me. Here's what I did to get things working again:

In the Terminal, navigate to the react-native/third-party/glog folder inside node_modules (for me, this was cd node_modules/react-native/third-party/glog-0.3.4)
Once actively in this folder, run ../../scripts/ios-configure-glog.sh
Glog is configured and the required config.h header file is created for Xcode to find

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>aps-environment</key>
	<string>production</string>
</dict>
</plist>
