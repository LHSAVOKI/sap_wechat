package weChatDemo;

import java.util.ArrayList;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoRepository;
import com.sap.conn.jco.JCoTable;

public class MenuUsageBean implements java.io.Serializable {

	private String usageDefJSON;

	private String usagePercentageJSON;

	private String defaultMenuKey;

	private final ArrayList<MenuUsage> menuUsageList;

	private final ArrayList<MenuDef> menuDefList;

	public MenuUsageBean() {
		menuUsageList = new ArrayList<MenuUsage>();

		menuDefList = new ArrayList<MenuDef>();

		retrieveUsageData();

		calculateUsagePercentage();
	}

	public String getUsageDefJSON() {
		return usageDefJSON;
	}

	public String getUsagePercentageJSON() {
		return usagePercentageJSON;
	}

	public String getUsageFromMenu(String key) {

		JSONArray array = new JSONArray();

		for (int i = 0; i < menuUsageList.size(); i++) {
			if (menuUsageList.get(i).key.equalsIgnoreCase(key) == true) {

				JSONObject object = new JSONObject();

				object.put("访问次数", menuUsageList.get(i).usedNum);
				object.put("时间", getMonth(menuUsageList.get(i).month));

				array.add(object);
			}
		}

		return array.toString();
	}

	public String getDefaultMenuKey() {
		return this.defaultMenuKey;
	}

	private String getMonth(int m) {

		if (m == 1) {
			return "一月";

		} else if (m == 2) {
			return "二月";
		} else if (m == 3) {
			return "三月";
		} else if (m == 4) {
			return "四月";
		} else if (m == 5) {
			return "五月";
		} else if (m == 6) {
			return "六月";
		} else if (m == 7) {
			return "七月";
		} else if (m == 8) {
			return "八月";
		} else if (m == 9) {
			return "九月";
		} else if (m == 10) {
			return "十月";
		} else if (m == 11) {
			return "十一月";
		} else if (m == 12) {
			return "十二月";
		} else {
			return "";
		}
	}

	private void retrieveUsageData() {

		JCoDestination destination = null;
		JCoTable usageDef = null;
		JCoFunction function = null;
		try {
			destination = JCoDestinationManager.getDestination("WeChatDemoRFC");

			// make an invocation of STFC_CONNECTION in the backend;
			JCoRepository repo = destination.getRepository();
			function = repo.getFunction("ZCRM_SOC_GET_USAGE");
			function.execute(destination);

			JCoParameterList exportParam = function.getExportParameterList();
			usageDef = exportParam.getTable("ET_USAGE_DEF");

		} catch (JCoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		JSONArray array = new JSONArray();

		for (int i = 0; i < usageDef.getNumRows(); i++) {
			usageDef.setRow(i);
			JSONObject object = new JSONObject();
			object.put("menu_key", usageDef.getString("EVENT_KEY"));
			object.put("menu_name", usageDef.getString("EVENT_NAME"));

			if (i == 0) {
				defaultMenuKey = usageDef.getString("EVENT_KEY");
			}

			array.add(object);

			MenuDef def = new MenuDef(usageDef.getString("EVENT_KEY"),
					usageDef.getString("EVENT_NAME"));
			menuDefList.add(def);
		}

		usageDefJSON = array.toString();

		JCoParameterList tableParameter = function.getTableParameterList();
		JCoTable usageData = tableParameter.getTable("ET_USAGE");
		for (int i = 0; i < usageData.getNumRows(); i++) {
			usageData.setRow(i);
			MenuUsage usage = new MenuUsage(usageData.getString("EVENT_KEY"),
					usageData.getInt("USED_NUM"),
					usageData.getInt("USED_MONTH"));

			menuUsageList.add(usage);
		}
	}

	private void calculateUsagePercentage() {

		JSONArray array = new JSONArray();
		int total = 0;
		for (int m = 0; m < this.menuUsageList.size(); m++) {
			total = total + menuUsageList.get(m).usedNum;
		}

		for (int i = 0; i < menuDefList.size(); i++) {
			int totalPerMenu = 0;
			for (int j = 0; j < this.menuUsageList.size(); j++) {
				if (menuUsageList.get(j).key.equalsIgnoreCase(menuDefList
						.get(i).key) == true) {
					totalPerMenu = totalPerMenu + menuUsageList.get(j).usedNum;
				}
			}

			JSONObject object = new JSONObject();
			object.put("menu", menuDefList.get(i).name);
			object.put("menu_usage_percentage", totalPerMenu);
			object.put("channel", "wechat");
			array.add(object);
		}

		this.usagePercentageJSON = array.toString();
	}

	public class MenuDef {
		private final String key;
		private final String name;

		public MenuDef(String k, String n) {
			key = k;
			name = n;
		}
	}

	public class MenuUsage {

		private final String key;
		private final int usedNum;
		private final int month;

		public MenuUsage(String menuKey, int num, int m) {
			key = menuKey;
			usedNum = num;
			month = m;
		}
	}
}
