const data = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 2 },
  { id: 6, parentId: 3 }
]

function createNode(id, data) {
  // data中去查找根节点下有哪些子节点
  const childData = data.filter(({ parentId }) => parentId === id)

  // 重写节点

  const node = {
    id,
    children: childData.reduce((acc, cur) => {
      acc.push(createNode(cur.id, data))
      return acc;
    }, [])
  }
  return node
}

function getTree(data) {
  // 获取到哪个是根节点
  const rootNodeData = data.find(({ parentId }) => parentId === null)

  if (!rootNodeData) {
    throw new Error('数据中找不到根的节点')
  }

  // 从根节点开始创建，构建树形结构
  return createNode(rootNodeData.id, data)
}

console.log(JSON.stringify(getTree(data)))