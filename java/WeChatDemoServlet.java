package weChatDemo;

import java.io.IOException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;

import com.sap.core.connectivity.api.DestinationException;
import com.sap.core.connectivity.api.http.HttpDestination;

/**
 * Servlet implementation class WeChatDemoServlet
 */
public class WeChatDemoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public WeChatDemoServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		response.getWriter().println(
				"WeChat Demo Server has successfully started!");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		// Define request encoding as UTF-8
		request.setCharacterEncoding("UTF-8");
		StringBuffer sBuffer = new StringBuffer("");

		// Fetch encoding stream
		ServletInputStream SStream = request.getInputStream();
		byte[] buf = new byte[1024];
		int len = SStream.read(buf, 0, 1024);

		while (len != -1) {
			sBuffer.append(new String(buf, 0, len, "UTF-8"));
			len = SStream.read(buf, 0, 1024);
		}

		// Close stream & store in string content
		SStream.close();
		String content = sBuffer.toString();

		try {
			// Access the HttpDestination for the resource "WeChatDemo"
			// specified in the web.xml
			Context ctx = new InitialContext();
			HttpDestination destination = (HttpDestination) ctx
					.lookup("java:comp/env/WeChatDemo");
			HttpClient createHttpClient = destination.createHttpClient();

			// Make a POST-request to the back-end
			// For basic authentication use HttpGet get = new HttpGet("");
			HttpPost post = new HttpPost("crm_wechatdemo");
			StringEntity SEntity = new StringEntity(content);
			SEntity.setContentType("application/x-www-form-urlencoded");
			post.setEntity(SEntity);

			HttpResponse resp = createHttpClient.execute(post);
			HttpEntity entity = resp.getEntity();
			String respToString = EntityUtils.toString(entity);
			int statusCode = resp.getStatusLine().getStatusCode();

			response.getWriter().println("Status code: " + statusCode);
			response.getWriter().println("Response: " + respToString);

		} catch (DestinationException e) {
			throw new RuntimeException(e);
		} catch (NamingException e) {
			throw new RuntimeException(e);
		}

	}

}
