const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})以及${versions.count}`

information.addEventListener('click', async () => {
    const data = await fileManager.open()
    console.log(11112, data,data.toString())
    let myNode = document.createTextNode(data.toString());
    document.body.insertBefore(myNode, document.body.firstChild);
})

