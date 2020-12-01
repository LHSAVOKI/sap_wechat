package weChatDemo;

import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoRepository;

public class RegisterProductBean implements java.io.Serializable {

	private String return_result = "";

	private String register_success = "";

	private String serial_no = "";

	private String po_date = "";

	public RegisterProductBean() throws JCoException {

	}

	public void registerproduct(String userID) throws JCoException {

		JCoDestination destination = JCoDestinationManager
				.getDestination("WeChatDemoRFC");

		// make an invocation of STFC_CONNECTION in the backend;
		JCoRepository repo = destination.getRepository();
		JCoFunction stfcConnection = repo
				.getFunction("ZCRM_SOC_REGISTER_PRODUCT");

		JCoParameterList importParam = stfcConnection.getImportParameterList();

		importParam.setValue("IV_USER_ID", userID);

		importParam.setValue("IV_SERIAL_NO", this.serial_no);
		importParam.setValue("IV_PO_DATE", this.po_date);

		stfcConnection.execute(destination);

		JCoParameterList exportParam = stfcConnection.getExportParameterList();

		this.return_result = exportParam.getString("EV_RESULT");
		this.register_success = exportParam.getString("EV_REG_SUCCESS");
	}

	public String return_value() {
		return return_result;
	}

	public String return_reg_status() {
		return register_success;
	}

	public String getserno() {

		return serial_no;
	}

	public void setSerialNo(String iserno) {
		serial_no = iserno;
	}

	public String getpodate() {

		return po_date;
	}

	public void setPoDate(String ipodate) {
		po_date = ipodate;
	}
}