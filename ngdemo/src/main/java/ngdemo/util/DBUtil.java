package ngdemo.util;

import java.net.UnknownHostException;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
/***
 * 
 * @author sanjay
 * @date 10-oct-2014
 * @description : this class defines utility methods and properties to communicate with mongodb 
 */
public class DBUtil {
	private MongoClient mongoClient;
	private DB db;
	private DBCollection table;
	private static DBUtil dbUtil;
	
	private DBUtil() throws UnknownHostException {
		mongoClient = new MongoClient();
		db = mongoClient.getDB("qa");
		table = db.getCollection("script");
	}
	
	public static DBUtil createInstance() throws UnknownHostException{
		if(dbUtil == null ){
			return new DBUtil();
		}
		return null;
	}
	
	public DBCollection getTable(){
		return table;
	}
	

}
