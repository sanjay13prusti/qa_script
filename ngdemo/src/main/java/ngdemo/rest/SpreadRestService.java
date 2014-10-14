package ngdemo.rest;

import java.net.UnknownHostException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import ngdemo.domain.SpreadRow;
import ngdemo.service.SpreadService;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;


@Path("/qascript")
/***
 * 
 * @author sanjay
 * @date 10-oct-2014
 * @description : this class declares methods for all restful web services
 */
public class SpreadRestService {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public LinkedList<Map<String, Object>> getSpreadDataInJSON() throws UnknownHostException {
        SpreadService spreadService = new SpreadService();
        return spreadService.getSpreadData();
    }
    @POST
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public void postSpreadSheetInJSON(List<BasicDBObject> listOfObjects) throws UnknownHostException{
    	System.out.println("list :" +listOfObjects);
    	SpreadService service = new SpreadService();
    	 service.postSpreadSheetData(listOfObjects);
		//System.out.println("inside post of QAScriptRestService : "+qaScript);
	}
}
