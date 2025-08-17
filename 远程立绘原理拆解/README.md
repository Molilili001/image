# Galgame 远程资源更新模块 (Remote Resource Updater)

这是一个独立的 JavaScript 模块，用于从远程服务器获取、缓存并管理动态资源（如图片、配置等）。它的设计灵感来源于 `fusion_galgame_complete.html` 中的实现，旨在提供一个可重用、健壮的解决方案。

## 特性

- **远程加载**: 从指定的 URL 加载 JSON 格式的资源配置文件。
- **智能缓存**: 使用 `localStorage` 对获取的数据进行缓存，减少不必要的网络请求。
- **缓存过期**: 可以自定义缓存的有效时间，过期后自动重新获取。
- **强制刷新**: 提供一个公共方法，可以随时手动触发强制更新。
- **优雅降级**: 在网络请求失败时，会自动回退到上一次的有效缓存；如果缓存也不存在，则使用预设的备用数据，保证程序的健壮性。
- **防止浏览器缓存**: 在请求远程 URL 时自动附加时间戳，以绕过浏览器的 HTTP 缓存。

## 如何使用

### 1. 引入模块

将 `explanation_and_code.txt` 文件中提取的 `RemoteResourceUpdater` 类的代码复制到你的项目中。你可以将其保存为一个单独的 `.js` 文件（例如 `resourceUpdater.js`）并通过 `<script>` 标签引入，或者直接嵌入到你现有的 JavaScript 代码中。

### 2. 实例化更新器

在使用该模块的地方，创建一个 `RemoteResourceUpdater` 的实例。你需要提供远程 JSON 文件的 URL，并可以根据需要提供一些自定义选项。

```javascript
// 远程配置文件的 URL
const REMOTE_CONFIG_URL = 'https://your-repository/path/to/your_config.json';

// (可选) 定义备用数据，以防网络和缓存都不可用
const FALLBACK_DATA = {
    'character_A': { "default_image": "local/images/char_a_fallback.png" },
    'character_B': { "default_image": "local/images/char_b_fallback.png" }
};

// 创建实例
const resourceUpdater = new RemoteResourceUpdater(REMOTE_CONFIG_URL, {
    cacheKey: 'my_game_resource_cache',      // localStorage 中存储数据的键名
    lastFetchKey: 'my_game_resource_fetch_time', // localStorage 中存储时间戳的键名
    cacheDurationMs: 2 * 60 * 60 * 1000,     // 缓存有效期设为2小时
    fallbackData: FALLBACK_DATA              // 设置备用数据
});
```

### 3. 获取数据

调用 `getData()` 方法来获取资源。该方法会自动处理缓存逻辑。由于这是一个异步操作，你需要使用 `async/await` 或 `.then()`。

```javascript
async function initializeGame() {
    try {
        const resources = await resourceUpdater.getData();
        console.log("成功获取资源:", resources);
        
        // 在这里使用获取到的 resources 数据来渲染你的界面
        // renderUI(resources);

    } catch (error) {
        console.error("初始化失败:", error);
    }
}

// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', initializeGame);
```

### 4. 实现手动更新

为用户提供一个刷新按钮，并将其点击事件绑定到 `forceFetchData()` 方法。

**HTML:**
```html
<button id="force-refresh-btn">强制更新资源</button>
```

**JavaScript:**
```javascript
const refreshButton = document.getElementById('force-refresh-btn');

if (refreshButton) {
    refreshButton.addEventListener('click', async () => {
        alert('正在从服务器检查更新...');
        try {
            const newResources = await resourceUpdater.forceFetchData();
            alert('资源已更新至最新版本！');
            
            // 更新成功后，你可能需要重新渲染界面
            // renderUI(newResources);

        } catch (error) {
            alert('更新失败，请检查网络连接。');
        }
    });
}
```

## 远程 JSON 文件示例

你的远程 `your_config.json` 文件应该是一个有效的 JSON 格式，其结构可以根据你的需求自由定义。例如：

```json
{
  "洛千霜": {
    "sfw": [
      "https://cdn.jsdelivr.net/gh/user/repo/images/luoqianshuang_1.png",
      "https://cdn.jsdelivr.net/gh/user/repo/images/luoqianshuang_2.png"
    ],
    "hidden": {
      "url": "https://cdn.jsdelivr.net/gh/user/repo/images/luoqianshuang_secret.png",
      "description": "达成特殊结局后解锁的CG",
      "unlock_condition": {
        "path": "洛千霜.好感度[0]",
        "value": 100
      }
    }
  },
  "林语惊": {
    "sfw": [
      "https://cdn.jsdelivr.net/gh/user/repo/images/linyujing_1.png"
    ]
  }
}
```

---

通过以上步骤，你就可以轻松地为你的项目集成一个强大且灵活的远程资源管理系统。