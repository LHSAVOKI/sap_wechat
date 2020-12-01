package weChatDemo;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoRepository;

public class CustomerInfoBean implements java.io.Serializable {

	private String address = null;
	private String error = "";
	private String postalCode = null;
	private String mobileNum = null;
	private String email = null;
	private String firstName = null;
	private String lastName = null;
	private String birthday = null;

	private String userID = "";// "oXu7bt6g5xrAIEpfdeb5Sfrevr5o";

	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

	private final SimpleDateFormat dateFormatJQuery = new SimpleDateFormat(

	"MM/dd/yyyy");

	public CustomerInfoBean() throws JCoException {

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

	public void retriveCustomerInfo() throws JCoException {
		JCoDestination destination = JCoDestinationManager
				.getDestination("WeChatDemoRFC");

		// make an invocation of STFC_CONNECTION in the backend;
		JCoRepository repo = destination.getRepository();
		JCoFunction stfcConnection = repo.getFunction("ZCRM_SOC_GET_BP_INFO");

		JCoParameterList importParam = stfcConnection.getImportParameterList();
		importParam.setValue("IV_USER_ID", userID);

		stfcConnection.execute(destination);

		JCoParameterList exportParam = stfcConnection.getExportParameterList();
		address = exportParam.getString("EV_ADDRESS");
		error = exportParam.getString("EV_ERROR");
		postalCode = exportParam.getString("EV_POSTAL_CODE");

		mobileNum = exportParam.getString("EV_MOBILE_NUM");

		if (mobileNum != null && mobileNum.length() > 0) {
			mobileNum = mobileNum.substring(3);
		}

		email = exportParam.getString("EV_EMAIL");
		firstName = exportParam.getString("EV_FIRST_NAME");
		lastName = exportParam.getString("EV_LAST_NAME");
		birthday = exportParam.getString("EV_BIRTHDAY");
	}

	public void updateCustomerInfo() throws JCoException {

		this.error = "";

		JCoDestination destination = JCoDestinationManager
				.getDestination("WeChatDemoRFC");

		// make an invocation of STFC_CONNECTION in the backend;
		JCoRepository repo = destination.getRepository();
		JCoFunction stfcConnection = repo
				.getFunction("ZCRM_SOC_UPDATE_BP_INFO");

		JCoParameterList importParam = stfcConnection.getImportParameterList();
		importParam.setValue("IV_ADDRESS", this.address);
		importParam.setValue("IV_POSTAL_CODE", this.postalCode);
		importParam.setValue("IV_MOBILE_NUM", this.mobileNum);
		importParam.setValue("IV_EMAIL", this.email);
		importParam.setValue("IV_FIRST_NAME", this.firstName);
		importParam.setValue("IV_LAST_NAME", this.lastName);
		importParam.setValue("IV_BIRTH_DAY", this.birthday);
		importParam.setValue("IV_USER_ID", userID);

		stfcConnection.execute(destination);

		JCoParameterList exportParam = stfcConnection.getExportParameterList();

		this.error = exportParam.getString("EV_ERROR");
	}

	public void setUserID(String id) {
		userID = id;
	}

	public String getAddress() {

		return address;
	}

	public void setAddress(String iaddress) {
		address = iaddress;
	}

	public String getError() {
		return error;
	}

	public String getPostalCode() {

		return postalCode;
	}

	public void setPostalCode(String postalC) {
		postalCode = postalC;
	}

	public String getMobileNum() {

		return mobileNum;
	}

	public void setMobileNum(String mobile) {
		mobileNum = mobile;
	}

	public String getFirstName() {

		return firstName;
	}

	public void setFirstName(String firstN) {
		firstName = firstN;
	}

	public String getLastName() {

		return lastName;
	}

	public void setLastName(String lastN) {
		lastName = lastN;
	}

	public String getBirthday() {

		try {

			return dateFormatJQuery.format(dateFormat.parse(this.birthday));

		} catch (ParseException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		}

		return this.birthday;

	}

	public void setBirthday(String birthD) {

		try {

			birthday = dateFormat.format(dateFormatJQuery.parse(birthD));

		} catch (ParseException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

			birthday = birthD;

		}

	}

	public String getEmail() {

		return email;
	}

	public void setEmail(String emailAd) {
		email = emailAd;
	}
}
