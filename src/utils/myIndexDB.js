export default class DBOperator{

    constructor(config){
      this.dbName = config.dbName || 'store'
      // 版本
      const version = config.version || 1
    
      this.DBOpenPro = new Promise((resolve, reject) => {
        // 打开数据库
        const DBOpenRequest = window.indexedDB.open(this.dbName, version)
            // 如果数据库打开失败
        DBOpenRequest.onerror = () => {
          reject('数据库打开异常')
        }
        
        DBOpenRequest.onsuccess = () => {        
          // 存储数据结果
          this.db = DBOpenRequest.result;
          resolve()
        }
  
        DBOpenRequest.onupgradeneeded = (event) => {
          const db = event.target.result;
       
          db.onerror = function() {
            reject('数据库打开失败');
          };
      
          // 创建一个数据库存储对象
          const objectStore = db.createObjectStore(this.dbName, { 
            APKStore: `APAddress,KStore`
          });
      
          // 定义存储对象的数据项
        //   objectStore.createIndex('id', 'id', {
        //     unique: true    
        //   })
          // 可以定义更多的字段
        };
      })
    }
  
    get(key){
      return new Promise((resolve, reject)=>{
        this.DBOpenPro.then(()=>{
          const transaction = this.db.transaction([this.dbName], "readonly")
          // 打开已经存储的数据对象
          const objectStore = transaction.objectStore(this.dbName)
          // 添加到数据对象中
          const objectStoreRequest = objectStore.get(key)     
          objectStoreRequest.onsuccess = () => {
            resolve(objectStoreRequest.result)
          }
          objectStoreRequest.onerror = (err) => {
            console.error(err)
            reject()
          }
        })
      })
    }
  
    set(value){
      return new Promise((resolve, reject)=>{
        this.DBOpenPro.then(()=>{
          const transaction = this.db.transaction([this.dbName], "readwrite")
          // 打开已经存储的数据对象
          const objectStore = transaction.objectStore(this.dbName)
          // 添加到数据对象中
          const objectStoreRequest = objectStore.put(value)     
          objectStoreRequest.onsuccess = () => {
            resolve()
          }
          objectStoreRequest.onerror = (err) => {
            console.error(`从数据库读取${key}异常`,err)
            reject()
          }
        })
      })
    }
  
    delete(id){
      return new Promise((resolve, reject)=>{
        this.DBOpenPro.then(()=>{
          const transaction = this.db.transaction([this.dbName], "readwrite")
          // 打开已经存储的数据对象
          const objectStore = transaction.objectStore(this.dbName)
          // 添加到数据对象中
          const objectStoreRequest = objectStore.delete(id)  
          objectStoreRequest.onsuccess = () => {
            resolve()
          }
          objectStoreRequest.onerror = (err) => {
            console.error(`从数据库删除${id}异常`, err)
            reject()
          }
        })
      })
    }
  }