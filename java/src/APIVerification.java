import java.util.Vector;

public class APIVerification
{
	public static void main(String[] args) 
	{
		String output = null;
		Vector<String> list = null;
		System.out.println("Begin to get User's all Friends list...");
		
		list = ProcessorGetUserID.run();
		
		System.out.println("Total Friend Number: " + list.size());
		for( int i = 0; i < list.size(); i++)
		{
			System.out.println("Friend Index: " + i + " Friend Name: " + list.elementAt(i).toString());
		}
		
		System.out.println("Begin to get Follow up List...");
		String[] followups = ProcessorGetFollowerIdsList.run();
		
		
		System.out.println("Total Follow Up Number: " + followups.length);
		
		for( int j = 0; j < followups.length; j++)
		{
			String name = ProcessorGetUserInformation.run(followups[j]);
			System.out.println("Follow up Index: " + j + " Followup Name: " + 
			(name == null? "Advertised Account has been deleted by Sina ":name));
		}
		
	}
}