package ngdemo.service;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import ngdemo.util.DBUtil;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

/***
 * 
 * @author sanjay
 * @date 10-oct-2014
 * @description : this class declares methods to serve web services
 */
public class SpreadService {
	private String data;

	/* this method retrieves all documents from mongodb */
	@SuppressWarnings("unchecked")
	public LinkedList<Map<String, Object>> getSpreadData()
			throws UnknownHostException {
		/* get dbcollection object representing a collection */
		DBCollection util = DBUtil.createInstance().getTable();
		DBCursor cursor = util.find();
		LinkedList<Map<String, Object>> linkedList = new LinkedList<Map<String, Object>>();
		/* iterating dbcollection object */
		while (cursor.hasNext()) {
			data = cursor.next().toString();
			LinkedHashMap<String, Object> result = null;
			try {
				result = new ObjectMapper()
						.readValue(data, LinkedHashMap.class);
			} catch (JsonParseException e) {
				e.printStackTrace();
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			linkedList.add(result);
		}
		
		
		
		return linkedList;
	}

	public boolean postSpreadSheetData(List<BasicDBObject> list)
			throws UnknownHostException {
		DBCollection util = DBUtil.createInstance().getTable();
		//System.out.println(list);
		//Gson gson=new Gson();
		//gson.fromJson(list, Spre)
		for (BasicDBObject dbObject : list)
			util.insert(dbObject);
		return true;
	}
}
