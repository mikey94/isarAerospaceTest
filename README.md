# isarAerospaceTest
Interview test

This test is included in two pages. For <i>Assignment A</i> click Assignment A from the website navbar and for <i>Assignment B</i> press Assignment B from the navbar.


<ins>Page 1 - Assignment A - Main UI</ins>

![Screenshot 2023-12-10 at 09 52 41](https://github.com/mikey94/isarAerospaceTest/assets/31029159/7c86b7d4-1713-468b-b981-31715c5881be)


<ins>Page 2 - Assignment B - Main UI </ins>

when <i>IsActionRequired</i> is in a false state. ActOnSpectrum button is disabled and displayed in a washed red color.

![Screenshot 2023-12-10 at 09 53 32](https://github.com/mikey94/isarAerospaceTest/assets/31029159/0e771d5c-98c9-4d5d-870b-49d8122de7e3)


The last one is when <i>IsActionRequired</i> is in a true state. When this happens, the ActOnSpectrum button will be enabled and displayed in bright red.

![Screenshot 2023-12-10 at 09 53 11](https://github.com/mikey94/isarAerospaceTest/assets/31029159/34995256-b3f5-43ab-9626-4c60eafd32f7)


<ins>Assignment C - Comments about API improvements and code structure</ins>

1). It's better to have a similar format shared between each endpoint. As an example response from endpoint <I>SpectrumStatus</I> we are getting all lowercase key format but In SpectrumWS keys are capitalized.

2). Adding extra security for API requests. Example:- Sending Authorization token with get request. 

3). Add versioning for API.

4). Add better documentation. Currently, API returns values but it doesn't mention any information regarding the units it uses. Example:- Velocity(m/s, km/h), Temperature(Celcius/F)

