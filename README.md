# WEB CALENDERの使い方

**コードを記述することでWEb上にカレンダーを追加できます**

--- 

## 注意事項

> [!CAUTION]
> html,css,javascriptの知識が必要です  
> 万が一WEB CALENDERを利用して不利益が生じた場合には一切の責任を負いません

---

## 利用方法
**1. html,css,JavaScriptのファイルの準備**  

**2. 各種ファイルの中にあるコードのコピー**  
※すべてhtmlファイルにcssやJacascriptのコードを記述しもらっても構いません
**htmlファイルのコピー**  
htmlファイルの10行目にある「div class="calendar-container"」というダクから32行目の「/div」というタグまでをコピーしてください
以下のコードコピーしても使えます
```ruby
<div class="calendar-container">
    <div class="calendar-header">
        <button class="nav-btn" id="prev">&lt;</button>
        <h2 id="monthYear"></h2>
        <button class="nav-btn" id="next">&gt;</button>
    </div>
    <table id="calendar">
        <thead>
            <tr>
                <th class="sun">日</th>
                <th>月</th>
                <th>火</th>
                <th>水</th>
                <th>木</th>
                <th>金</th>
                <th class="sat">土</th>
            </tr>
        </thead>
        <tbody id="calendar-body">
            <!-- JavaScriptで生成 -->
        </tbody>
    </table>
</div>

```
---

**cssファイルのコピー**  
cssの中にあるすべてのコードをコピーしてください
※デザインの変更をする場合はコピーしなくても良いです

---

**JavaScriptファイルのコピー**  
JavaScriptの中にあるすべてのコードをコピーしてください


