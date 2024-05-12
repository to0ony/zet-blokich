--Ubacivanje podataka iz csva
COPY disponent FROM 'C:\Users\anton\Documents\zet-blokich\tabula-win-1.2.1\Disponenti\disponentRaspored_13_5_24.csv' DELIMITER ',' CSV HEADER;
COPY sluzba FROM 'D:\coding\BLOKICH\tabula-win-1.2.1\Sluzbe\JesenPJP_2024.csv' DELIMITER ',' CSV HEADER;
COPY vozaci FROM 'D:\coding\BLOKICH\tabula-win-1.2.1\ImenaVozaca\imenavozaca.csv' DELIMITER ',' CSV HEADER;

--Kreiranje tablice disponenta, sluzbe i vozaci
CREATE TABLE disponent (
    Radnik INT(255),
    Pon VARCHAR(255),
    Uto VARCHAR(255),
    Sri VARCHAR(255),
    Cet VARCHAR(255),
    Pet VARCHAR(255),
    Sub VARCHAR(255),
    Ned VARCHAR(255),
    Tjedan_u_godini INT DEFAULT default_week_and_year(),
    Godina INT DEFAULT default_year()
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

--U JEDNOM KOMADU SE POKRECE - POPUNJAVA TJEDAN I GODINU VAZENJA DISPONENTA
-- Definicija funkcije za dobivanje trenutnog tjedna u godini
CREATE OR REPLACE FUNCTION default_week_in_year()
RETURNS INTEGER AS $$
DECLARE
    current_week INTEGER;
BEGIN
    -- Koristimo funkciju EXTRACT za izvlačenje tjedna iz trenutnog datuma
    SELECT EXTRACT(WEEK FROM CURRENT_DATE) INTO current_week;
    RETURN current_week;
END;
$$ LANGUAGE plpgsql;

-- Definicija funkcije za dobivanje trenutne godine
CREATE OR REPLACE FUNCTION default_year()
RETURNS INTEGER AS $$
DECLARE
    current_year INTEGER;
BEGIN
    -- Koristimo funkciju EXTRACT za izvlačenje godine iz trenutnog datuma
    SELECT EXTRACT(YEAR FROM CURRENT_DATE) INTO current_year;
    RETURN current_year;
END;
$$ LANGUAGE plpgsql;

-- Ažuriranje tablice "disponent" postavljanjem vrijednosti samo ako su prazne
UPDATE disponent
SET 
    tjedan_u_godini = CASE WHEN tjedan_u_godini IS NULL THEN default_week_in_year() ELSE tjedan_u_godini END,
    godina = CASE WHEN godina IS NULL THEN default_year() ELSE godina END;
--DO OVDJE

   
--KORISNI UPITI
SELECT r.radnik,v.imeprezime, s.* 
FROM disponent_19tj_2024 r
INNER JOIN sluzba s ON r.Pon = s.BrojSluzbe 
INNER JOIN vozaci v ON r.radnik = v.brojvozaca
WHERE s.linija = '126'
ORDER BY od


SELECT r.radnik, v.imeprezime, s.* FROM disponent r INNER JOIN sluzba s ON r.Uto = s.BrojSluzbe INNER JOIN vozaci v ON r.radnik = v.brojvozaca WHERE s.linija = '162' and r.tjedan_u_godini = default_week_in_year() ORDER BY od
