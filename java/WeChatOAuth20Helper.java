package weChatDemo;

import java.io.IOException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;

import com.sap.core.connectivity.api.DestinationException;
import com.sap.core.connectivity.api.http.HttpDestination;

public class WeChatOAuth20Helper {

	static public void RedirectToAthenticattionPage(
			HttpServletResponse response, String redirectURL)
			throws IOException {

		String wechatURL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxac5c3cada78f2473&redirect_uri="
				+ java.net.URLEncoder.encode(redirectURL, "UTF-8")
				+ "&response_type=code&scope=snsapi_base#wechat_redirect";

		response.sendRedirect(wechatURL);
	}

	static public String Test() {

		String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxac5c3cada78f2473&secret=0e8dda2d44c2dc70e85e9e9b175d07a8"
				+ "&code=" + "11111111" + "&grant_type=authorization_code";

		HttpResponse response;
		HttpClient httpClient = null;
		HttpDestination destination;
		Context ctx;
		try {
			ctx = new InitialContext();

			destination = (HttpDestination) ctx
					.lookup("java:comp/env/WeChatOAuth");

			httpClient = destination.createHttpClient();
			HttpGet httpGet = new HttpGet(url);

			response = httpClient.execute(httpGet);

			String result = EntityUtils.toString(response.getEntity());

			return result;

		} catch (NamingException e1) {
			// TODO Auto-generated catch block
			return e1.getMessage();
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			return e.getMessage();
		} catch (IOException e) {
			return e.getMessage();
		} catch (DestinationException e) {
			// TODO Auto-generated catch block
			return e.getMessage();
		} finally {
			// httpClient.getConnectionManager().shutdown();
		}
	}

	static public String GetUserIDFromCode(String code) {

		if (code != null && code.length() > 0) {

			String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxac5c3cada78f2473&secret=0e8dda2d44c2dc70e85e9e9b175d07a8"
					+ "&code=" + code + "&grant_type=authorization_code";

			HttpDestination destination;
			Context ctx;
			HttpClient httpClient;

			try {

				ctx = new InitialContext();

				destination = (HttpDestination) ctx
						.lookup("java:comp/env/WeChatOAuth");

				httpClient = destination.createHttpClient();
				HttpGet httpGet = new HttpGet(url);

				HttpResponse response = httpClient.execute(httpGet);
				String result = EntityUtils.toString(response.getEntity());

				JSONObject jsonObject = JSONObject.fromObject(result);
				String openID = (String) jsonObject.get("openid");

				return openID;

			} catch (ClientProtocolException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return "";
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return "";
			} catch (NamingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return "";
			} catch (DestinationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return "";
			}

		} else {
			return "";
		}
	}
}
