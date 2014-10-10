package ngdemo.rest;

import java.net.UnknownHostException;
import java.util.LinkedList;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import ngdemo.service.SpreadService;


@Path("/documents")
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
}
