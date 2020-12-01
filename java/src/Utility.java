import java.util.Vector;

public class Utility
{
	static public void SetProxy()
	{
		System.setProperty("http.proxyHost", "proxy.wdf.sap.corp");
		System.setProperty("http.proxyPort", "8080");
		System.setProperty("https.proxyHost", "proxy.wdf.sap.corp");
		System.setProperty("https.proxyPort", "8080");
	}
	
	static public Vector<String> getFriendList(String input)
	{
		Vector<String> friendList = new Vector<String>();
		String[] temp = input.replace("\"", "").split(",");
		for ( int i = 0; i < temp.length; i++)
		{
			String[] list = temp[i].split(":");
			if ( list.length < 2 )
				continue;
			if ( list[0].trim().equals("screen_name"))
				friendList.add(list[1].trim());
		}
		return friendList;
	}
	static public String[] getFollowupID(String input)
	{
		int first = input.indexOf('[');
		int last = input.lastIndexOf(']');
		return  input.substring(++first,last).split(",");
	}
	static public String getFollowupName(String name)
	{
		String s = "screen_name";
		String input = name.replace("\"", "");
		int first = input.indexOf(s);
		String temp = input.substring(first+s.length()+1, input.length() - first -1 );
		int second = temp.indexOf(",");
		return temp.substring(0,second);
	}
}