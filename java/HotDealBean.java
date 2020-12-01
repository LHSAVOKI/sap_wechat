package weChatDemo;

import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoRepository;

public class HotDealBean implements java.io.Serializable {

	private String result = null;

	public HotDealBean() throws JCoException {

		// JCoDestination destination = JCoDestinationManager
		// .getDestination("JCoDemoSystem");
		//
		// // make an invocation of STFC_CONNECTION in the backend;
		// JCoRepository repo = destination.getRepository();
		// JCoFunction stfcConnection =
		// repo.getFunction("ZCRM_SOC_GET_BP_INFO");
		//
		// JCoParameterList imports = stfcConnection.getImportParameterList();
		// imports.setValue("IV_USER_ID", "ssss");
		//
		// stfcConnection.execute(destination);
		//
		//
		//
		// JCoParameterList exports = stfcConnection.getExportParameterList();
		// address = exports.getString("EV_ADDRESS");
		// error = exports.getString("EV_ERROR");
	}

	public void registHotDeal(String userID) throws JCoException {
		JCoDestination destination = JCoDestinationManager
				.getDestination("WeChatDemoRFC");

		// make an invocation of STFC_CONNECTION in the backend;
		JCoRepository repo = destination.getRepository();
		JCoFunction stfcConnection = repo.getFunction("ZCRM_SOC_JOIN_HOT_DEAL");

		JCoParameterList importParam = stfcConnection.getImportParameterList();
		importParam.setValue("IV_SOCIALUSER", userID);

		stfcConnection.execute(destination);

		JCoParameterList exportParam = stfcConnection.getExportParameterList();
		result = exportParam.getString("EV_STRING");
	}

	public String getResult() {

		return result;
	}

}
