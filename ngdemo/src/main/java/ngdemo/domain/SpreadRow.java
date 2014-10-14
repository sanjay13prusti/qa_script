package ngdemo.domain;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
// from http://www.vogella.com/articles/REST/
// JAX-RS supports an automatic mapping from JAXB annotated class to XML and
// JSON
public class SpreadRow implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String _id;
	private String testCaseId;
	private String testStep;
	private String requestURL;
	private String type;
	private String expectedAssertion;
	private String expectedValue;
	private String status;
	private String sheet;

	@Override
	public String toString() {
		return "SpreadRow [_id=" + _id + ", testCaseId=" + testCaseId
				+ ", testStep=" + testStep + ", requestURL=" + requestURL
				+ ", type=" + type + ", expectedAssertion=" + expectedAssertion
				+ ", expectedValue=" + expectedValue + ", status=" + status
				+ ", sheet=" + sheet + "]";
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getSheet() {
		return sheet;
	}

	public void setSheet(String sheet) {
		this.sheet = sheet;
	}

	public String getTestCaseId() {
		return testCaseId;
	}

	public void setTestCaseId(String testCaseId) {
		this.testCaseId = testCaseId;
	}

	public String getTestStep() {
		return testStep;
	}

	public void setTestStep(String testStep) {
		this.testStep = testStep;
	}

	public String getRequestURL() {
		return requestURL;
	}

	public void setRequestURL(String requestURL) {
		this.requestURL = requestURL;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getExpectedAssertion() {
		return expectedAssertion;
	}

	public void setExpectedAssertion(String expectedAssertion) {
		this.expectedAssertion = expectedAssertion;
	}

	public String getExpectedValue() {
		return expectedValue;
	}

	public void setExpectedValue(String expectedValue) {
		this.expectedValue = expectedValue;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
