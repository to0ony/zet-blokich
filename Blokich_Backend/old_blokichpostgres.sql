CREATE TABLE Disponent (
    Radnik INT,
    Pon VARCHAR(5),
    Uto VARCHAR(5),
    Sri VARCHAR(5),
    Cet VARCHAR(5),
    Pet VARCHAR(5),
    Sub VARCHAR(5),
    Ned VARCHAR(5)
);

CREATE TABLE disponent (
    Radnik VARCHAR(255),
    Pon VARCHAR(255),
    Uto VARCHAR(255),
    Sri VARCHAR(255),
    Cet VARCHAR(255),
    Pet VARCHAR(255),
    Sub VARCHAR(255),
    Ned VARCHAR(255),
    Tjedan_u_godini INT DEFAULT DATEPART(wk, GETDATE()),
    Godina INT DEFAULT YEAR(GETDATE())
);

CREATE TABLE Sluzba (
    brojSluzbe VARCHAR(10),
    linija VARCHAR(10),
    vr INT,
    nastupSluzbe VARCHAR(10),
    od VARCHAR(5),
    "do" VARCHAR(5),
    zavrsetakSluzbe VARCHAR(10)
);

CREATE TABLE Vozaci(
	brojVozaca INT,
	ImePrezime VARCHAR(30)
);



TRUNCATE disponent;
COPY disponent FROM 'D:\coding\BLOKICH\disponent.csv' DELIMITER ',' CSV HEADER;

COPY sluzba FROM 'D:\coding\BLOKICH\tabula-win-1.2.1\JesenPJP_2024.csv' DELIMITER ',' CSV HEADER;

COPY Vozaci FROM 'D:\coding\BLOKICH\tabula-win-1.2.1\imenavozaca.csv' DELIMITER ',' CSV HEADER;

SELECT * FROM disponent WHERE radnik LIKE 3478

SELECT * FROM sluzba WHERE brojsluzbe LIKE '18'

TRUNCATE sluzba

SELECT r.radnik,v.imeprezime, s.* 
FROM disponent_19tj_2024 r
INNER JOIN sluzba s ON r.Pon = s.BrojSluzbe 
INNER JOIN vozaci v ON r.radnik = v.brojvozaca
WHERE s.linija = '126'
ORDER BY od


SELECT r.radnik, v.imeprezime, s.* FROM disponent_19tj_2024 r INNER JOIN sluzba s ON r.Uto = s.BrojSluzbe INNER JOIN vozaci v ON r.radnik = v.brojvozaca WHERE s.linija = '162' ORDER BY od



