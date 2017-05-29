import VueFire from 'VueFire'
import Firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAzZtWDcyTn2TygAZQlxBcpRD0OeiP2oWE",
  authDomain: "study-platform-12889.firebaseapp.com",
  databaseURL: "https://study-platform-12889.firebaseio.com",
  projectId: "study-platform-12889",
  storageBucket: "study-platform-12889.appspot.com",
  messagingSenderId: "777442655419"
}

const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.database()

export default db
