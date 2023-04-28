import { fetchUrl } from "./third.party.request";


describe('fetchUrl_function', () => {

  it("test_fetch_url_default_options_plain_response", async () => {
      const response = await fetchUrl("https://jsonplaceholder.typicode.com/posts/1");
      expect(response.error).toBeFalsy();
      expect(response.errorTrace).toBeNull();
      expect(typeof response.response).toBe("string");
  });

  it("test_fetch_url_custom_options_json_response", async () => {
      const options = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              title: "foo",
              body: "bar",
              userId: 1
          })
      };
      const response = await fetchUrl("https://jsonplaceholder.typicode.com/posts", options, "json");
      expect(response.error).toBeFalsy();
      expect(response.errorTrace).toBeNull();
      expect(typeof response.response).toBe("object");
  });

  it("test_fetch_url_non_existent_url", async () => {
      const response = await fetchUrl("https://nonexistenturl.com");
      expect(response.error).toBeTruthy();
      expect(response.errorTrace).toBe("request to https://nonexistenturl.com/ failed, reason: read ECONNRESET");
      expect(response.response).toBe(null);
  });

  it("test_fetch_url_slow_url_timeout", async () => {
      const response = await fetchUrl("https://httpstat.us/200?sleep=5000", null, "plain", 1000);
      expect(response.error).toBeTruthy();
  });

});
