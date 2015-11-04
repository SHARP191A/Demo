import org.json.simple.*;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		RandomDateGenerator rdg = new RandomDateGenerator(1000);
		
		JSONArray data = new JSONArray();
		for(int i=0; i < rdg.getDates().length; i++)
		{
			JSONObject entry = new JSONObject();
			
			RandomDate rDate = rdg.getDates()[i];
			String dateString = rDate.getDate();
			int dayInt = rDate.getDayValue();
			int monthInt = rDate.getMonthValue();
			
			entry.put("date",dateString);
			entry.put("day", dayInt);
			entry.put("month", monthInt);
			data.add(entry);
		}
		
		System.out.println(data);
	}

}
