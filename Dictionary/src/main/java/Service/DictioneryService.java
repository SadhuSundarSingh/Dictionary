package Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class DictioneryService {
	public static DictioneryService obj = null;
	
	private DictioneryService() {};
	
	public static DictioneryService getInstance() {
		if(obj==null) {
			obj = new DictioneryService();
		}
		return obj;
	}
	
	public String getAns(String word) {
		String ans = "";
		try {
			URL url = new URL("https://api.dictionaryapi.dev/api/v2/entries/en/"+word);
			HttpURLConnection cn = (HttpURLConnection) url.openConnection();
			if(cn.getResponseCode()==200) {
				InputStream is = cn.getInputStream();
				BufferedReader br = new BufferedReader(new InputStreamReader(is));
				String line = br.readLine();
				if(line != null) {
					while(line != null) {
						ans += line;
						line = br.readLine();
					}
					br.close();
				}
			}
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		return ans;
	}
}
