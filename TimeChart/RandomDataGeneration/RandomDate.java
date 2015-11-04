

import java.util.Date;

public class RandomDate {
	
	private String date;
	private int dayValue;
	private int monthValue;
	
	public RandomDate(String date, int dayValue, int monthValue)
	{
		this.date = date;
		this.dayValue = dayValue;
		this.monthValue = monthValue;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getDayValue() {
		return dayValue;
	}

	public void setDayValue(int dayValue) {
		this.dayValue = dayValue;
	}

	public int getMonthValue() {
		return monthValue;
	}

	public void setMonthValue(int monthValue) {
		this.monthValue = monthValue;
	}
}
