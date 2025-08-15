// [DEBUG] character_data.js - v2
console.log('[Remote Data Script] Starting execution of character_data.js...');

try {
  // 使用 'var' 在顶层作用域声明，以确保它成为全局变量
  var myRemoteCharacterData = {
    "洛千霜": {
      // 您可以在这里为“洛千霜”添加图片或其他数据
    },
    "林语惊": {
      "nsfw": {
        "精液": "https://gitgud.io/Molilili/images/-/raw/master/%E6%9E%97%E8%AF%AD%E6%83%8A/nsfw/1.png",
        "踩头": "https://gitgud.io/Molilili/images/-/raw/master/%E6%9E%97%E8%AF%AD%E6%83%8A/nsfw/2.png"
      },
      "sfw": {
        // 您可以在这里为“林语惊”添加SFW图片
      }
    },
    "陈予欢": {
      // 您可以在这里为“陈予欢”添加图片或其他数据
    }
  };

  console.log('[Remote Data Script] SUCCESS: myRemoteCharacterData has been created.');
  // 打印变量内容以供检查
  console.log(myRemoteCharacterData);

} catch (error) {
  console.error('[Remote Data Script] ERROR: An error occurred during script execution.', error);
}
