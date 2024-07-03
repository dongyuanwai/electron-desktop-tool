#! /bin/sh

desktopPath=/opt/ElectronDeskTopTool/entries/ElectronDeskTopTool.desktop

rootDesktop=/root/Desktop

if [ -d $rootDesktop ]; then

  cp $desktopPath $rootDesktop

fi

users=`users`

for u in $users

  do

  dir=/home/$u/Desktop

  cndir=/home/$u/桌面

  if [ -d $dir ]; then

    cp $desktopPath $dir;

    chmod 777 $dir/ElectronDeskTopTool.desktop;

  fi

  if [ -d $cndir ]; then

    cp $desktopPath $cndir;

    chmod 777 $cndir/ElectronDeskTopTool.desktop

  fi

done

# 设置 chrome-sandbox 的所有者为 root 并设置正确的权限
# 确保使用正确的路径到您的 chrome-sandbox 文件
chromeSandboxPath="/opt/ElectronDeskTopTool/chrome-sandbox"

# 检查 chrome-sandbox 文件是否存在
if [ -f "$chromeSandboxPath" ]; then
  # 更改所有者为 root
  chown root:root "$chromeSandboxPath"
  
  # 设置权限为 4755
  chmod 4755 "$chromeSandboxPath"
  
  echo "chrome-sandbox 权限和所有者已设置。"
else
  echo "警告：未找到 chrome-sandbox 文件：$chromeSandboxPath"
fi