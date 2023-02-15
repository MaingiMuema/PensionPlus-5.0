import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Axios from "axios";

//Localhost url for the server
const domain = "http://localhost:5000"; 

const Profile = () => {

  const KenyaAddresses = [
  "50413 Adungosi",
  "40406 Agenga",
  "40101 Ahero",
  "30101 Ainabkoi",
  "40114 Akado",
  "40139 Akala",
  "40140 Aluor",
  "50414 Alupe",
  "50244 Amagoro",
  "50403 Amukura",
  "40136 Andingo",
  "50412 Angurai",
  "40616 Anyiko",
  "40617 Anyuongi",
  "40618 Aram",
  "60302 Archer's Post",
  "30708 Arror",
  "40619 Asembo Bay",
  "40309 Asumbi",
  "00204 Athi River",
  "40115 Awach Bridge",
  "40328 Awach Tende",
  "20113 Bahati",
  "80210 Bamba",
  "80101 Bamburi",
  "50316 Banja",
  "50411 Bar Ober",
  "20601 Baragoi",
  "30306 Baraton",
  "10302 Baricho",
  "30409 Bartabwa",
  "30408 Bartolimo",
  "30411 Barwesa",
  "00226 Bibirioni",
  "01101 Bissil",
  "20409 Boito",
  "50206 Bokoli",
  "20400 Bomet",
  "20101 Bondeni",
  "40601 Bondo",
  "40620 Boro",
  "50415 Budalangi",
  "30702 Bugar",
  "50416 Buhuyi",
  "50233 Bukebe",
  "50417 Bukiri",
  "50105 Bukura",
  "50109 Bulimbo",
  "50404 Bumala",
  "50418 Bumutiru",
  "50200 Bungoma",
  "50301 Bunyore",
  "70104 Bura Tana",
  "30102 Burnt Forest",
  "00515 Buru Buru",
  "50400 Busia",
  "50101 Butere",
  "50405 Butula",
  "50210 Buyofu",
  "50302 Chamakhanga",
  "80102 Changamwe",
  "50317 Chavakali",
  "20138 Chebara",
  "30706 Chebiemit",
  "20215 Cheborge",
  "30125 Chebororwa",
  "20226 Chebunyo",
  "20401 Chebunyo",
  "20222 Chemamul",
  "20407 Chemaner",
  "40143 Chemase",
  "40116 Chemelil",
  "30206 Chemiron",
  "30605 Chepareria",
  "30207 Chepchoina",
  "20216 Chepkemel",
  "20137 Chepkiswet",
  "30129 Chepkorio",
  "30308 Chepkunyuk",
  "30309 Chepsonoi",
  "50201 Cheptais",
  "20410 Cheptalal",
  "30121 Chepterwai",
  "30709 Cheptongei",
  "50243 Chesamisi",
  "20217 Chesinendet",
  "30712 Chesoi",
  "60401 Chogoria",
  "60400 Chuka",
  "90219 Chuluni",
  "80314 Chumvini",
  "50202 Chwele",
  "00200 City Square",
  "80103 Coast General Hospital",
  "00201 Community",
  "70103 Dadaab",
  "40112 Dago",
  "00516 Dandora",
  "40117 Daraja Mbili",
  "40331 Dede",
  "80401 Diani Beach",
  "80104 Docks",
  "10401 Dol Dol",
  "01027 Donyo Sabuk",
  "50213 Dorofu",
  "40621 Dudi",
  "20118 Dundori",
  "00610 Eastleigh",
  "20115 Egerton University",
  "90139 Ekalakala",
  "70301 El Wak",
  "20102 Elburgon",
  "20103 Eldama Ravine",
  "30100 Eldoret",
  "30124 Eldoret Airport",
  "20119 Elementaita",
  "50429 Elugulu",
  "90121 Emali",
  "50110 Emarinda",
  "00501 Embakasi",
  "60100 Embu",
  "20140 Emining",
  "50314 Emuhaya",
  "10107 Endarasha",
  "90206 Endau",
  "30201 Endebess",
  "40703 Enosaen",
  "00500 Enterprise Road",
  "30122 Equator",
  "50303 Eregi",
  "00620 Esso Plaza",
  "40208 Etago",
  "80501 Faza",
  "20209 Fort Ternan",
  "50406 Funyula",
  "10210 Gacharageini",
  "00238 Gachika",
  "60119 Gachoka",
  "60209 Gaitu",
  "10109 Gakere Road",
  "10111 Gakindu",
  "01005 Gakoe",
  "10211 Gakurwe",
  "50318 Gambogi",
  "80205 Ganze",
  "60301 Garba Tulla",
  "70100 Garissa",
  "80201 Garsen",
  "10212 Gatara",
  "10112 Gatarakwa",
  "00239 Gathiruini",
  "00240 Gathugu",
  "10113 Gathuthi",
  "10114 Gatitu",
  "10115 Gatondo",
  "10305 Gatugura",
  "01028 Gatukuyu",
  "01030 Gatundu",
  "60216 Gatunga",
  "60404 Gatunga",
  "01013 Gatura",
  "80208 Gede",
  "40312 Gembe",
  "40503 Gesima",
  "40201 Gesusu",
  "10116 Giakaibei",
  "10108 Giakanja",
  "10117 Gichichi",
  "00601 Gigiri",
  "10213 Gikoe",
  "20116 Gilgil",
  "40407 Giribe",
  "50304 Gisambai",
  "00903 Githiga",
  "60205 Githongo",
  "01032 Githumu",
  "00216 Githunguri",
  "60212 Gitimene",
  "01003 Gituamba",
  "10209 Gitugi",
  "80206 Gongoni",
  "20411 Gorgor",
  "40313 Got Oyaro",
  "70202 Griftu",
  "70201 Habaswein",
  "50407 Hakati",
  "50312 Hamisi",
  "40640 Hawinga",
  "00612 Highridge",
  "70101 Hola",
  "40300 Homa Bay",
  "30109 Huruma",
  "10227 Ichichi",
  "40209 Igare",
  "01006 Igegania",
  "60402 Igoji",
  "20307 Igwamiti",
  "10118 Ihururu Market",
  "90120 Iiani Yi Mang'Ulu",
  "90135 Ikalaasa",
  "40415 Ikerege",
  "00904 Ikinu",
  "40501 Ikonge",
  "90207 Ikutha",
  "60405 Ikuu",
  "00214 Ilasit",
  "50111 Ileho",
  "50112 Imanga",
  "50113 Indechero",
  "80310 Iriwa",
  "60102 Ishiara",
  "40414 Isibania",
  "01102 Isinya",
  "60300 Isiolo",
  "50114 Isulu",
  "30700 Iten",
  "01015 Ithanga",
  "40504 Itibo",
  "40210 Itumbe",
  "50319 Jebrok",
  "00622 Juja Road",
  "30400 Kabarnet",
  "30401 Kabartonjo",
  "90205 Kabati",
  "20120 Kabatini",
  "20114 Kabazi",
  "00602 Kabete",
  "20201 Kabianga",
  "30130 Kabiemit",
  "20139 Kabimoi",
  "30303 Kabiyet",
  "20412 Kaboson",
  "50214 Kabula",
  "30601 Kacheliba",
  "40314 Kadel",
  "40223 Kadongo",
  "10119 Kagicha",
  "10306 Kagio",
  "10307 Kagumo",
  "01033 Kagunduini",
  "00223 Kagwe",
  "20304 Kaheho",
  "10206 Kahuhia",
  "10201 Kahuro",
  "10214 Kahuti",
  "30606 Kaibichbich",
  "30310 Kaiboi",
  "50305 Kaimosi",
  "30604 Kainuk",
  "01007 Kairi",
  "10215 Kairo",
  "01100 Kajiado",
  "50100 Kakamega",
  "50419 Kakemer",
  "30216 Kakibora",
  "80209 Kakoneni",
  "30501 Kakuma",
  "50115 Kakunga",
  "01014 Kakuzi",
  "90122 Kalamba",
  "90306 Kalamba",
  "90126 Kalawa",
  "01001 Kalimoni",
  "30502 Kalokol",
  "80105 Kaloleni",
  "20218 Kamaget",
  "10217 Kamahuha",
  "20134 Kamara",
  "10216 Kamberua",
  "50116 Kambiri",
  "10226 Kambiti",
  "00607 Kamiti",
  "20121 Kampi Ya Moto",
  "30406 Kampi Ya Samaki",
  "50216 Kamukuywa",
  "50408 Kamuriai",
  "90403 Kamuwongo",
  "20132 Kamwaura",
  "30113 Kamwosor",
  "40315 Kanam",
  "01034 Kandara",
  "40304 Kandiege",
  "50215 Kanduyi",
  "10218 Kangari",
  "10202 Kangema",
  "00625 Kangemi",
  "60603 Kangeta",
  "01008 Kangoo",
  "90115 Kangundo",
  "60118 Kanja",
  "01004 Kanjuku",
  "20309 Kanyaagia",
  "60206 Kanyakine",
  "10220 Kanyenyaini",
  "01011 Kanyoni",
  "60106 Kanyuambora",
  "90208 Kanziko",
  "30304 Kapcheno",
  "20413 Kapcherany",
  "30204 Kapcherop",
  "30311 Kapchorwa",
  "30410 Kapedo",
  "30600 Kapenguria",
  "50232 Kapkateny",
  "20214 Kapkatet",
  "20219 Kapkelek",
  "30119 Kapkenda",
  "20414 Kapkesosio",
  "20415 Kapkoros",
  "20206 Kapkugerwet",
  "30111 Kapngetuny",
  "30300 Kapsabet",
  "30208 Kapsara",
  "20211 Kapsoit",
  "50203 Kapsokwony",
  "30705 Kapsowar",
  "30313 Kapsumbeiwa",
  "20207 Kapsuser",
  "30114 Kaptagat",
  "30710 Kaptalamwa",
  "50234 Kaptama",
  "30701 Kaptarakwa",
  "20221 Kaptebengwet",
  "30312 Kaptel",
  "30711 Kapteren",
  "60105 Karaba",
  "10101 Karatina",
  "00233 Karatu",
  "10120 Karemeno",
  "00502 Karen",
  "10121 Karima",
  "60107 Karingari",
  "00615 Kariobangi",
  "40505 Karota",
  "10308 Karumandi",
  "40401 Karungu",
  "00219 Karuri",
  "60117 Karurumo",
  "00608 Kasarani",
  "80307 Kasigau",
  "90123 Kasikeu",
  "90106 Katangi",
  "90105 Kathiani",
  "90302 Kathonzweni",
  "60406 Kathwana",
  "30508 Katilu",
  "40118 Katito",
  "90404 Katse",
  "90217 Katutu",
  "90107 Kaviani",
  "90405 Kavuti",
  "10219 Kaweru",
  "40506 Kebirigo",
  "20220 Kedowa",
  "20501 Keekorok",
  "40515 Kegogi",
  "40416 Kegonga",
  "40413 Kehancha",
  "40301 Kendu Bay",
  "00202 Kenyatta Hospital",
  "00203 Kenyatta International Conference Center",
  "00609 Kenyatta University",
  "40211 Kenyenya",
  "20200 Kericho",
  "40202 Keroka",
  "10300 Kerugoya",
  "00906 Kerwa",
  "30215 Kesogon",
  "40212 Keumbu",
  "60108 Kevote",
  "50104 Khayega",
  "50306 Khumusalaba",
  "50135 Khwisero",
  "10122 Kiamariga",
  "60109 Kiambere",
  "00900 Kiambu",
  "00224 Kiambururu",
  "40213 Kiamokama",
  "60110 Kiamuringa",
  "10309 Kiamutuga",
  "00236 Kiamwangi",
  "10123 Kiandu",
  "60602 Kianjai",
  "60111 Kianjokoma",
  "10301 Kianyaga",
  "10124 Kiawarigi",
  "00237 Kibicho",
  "40119 Kibigori",
  "60201 Kibirichia",
  "10141 Kibirigwi",
  "40120 Kibos",
  "60112 Kibugu",
  "90137 Kibwezi",
  "10102 Kiganjo",
  "10203 Kigumo",
  "10207 Kihoya",
  "30110 Kihuga Square",
  "60207 Kiirua",
  "00220 Kijabe",
  "90125 Kikima",
  "00902 Kikuyu",
  "90305 Kilala",
  "40700 Kilgoris",
  "30315 Kilibwoni",
  "80108 Kilifi",
  "80107 Kilindini",
  "50315 Kilingili",
  "10125 Kimahuri",
  "00215 Kimana",
  "10140 Kimathi Way",
  "10310 Kimbimbi",
  "50204 Kimilili",
  "30209 Kiminini",
  "30120 Kimoning",
  "20225 Kimulot",
  "30128 Kimwarer",
  "20320 Kinamba",
  "80405 Kinango",
  "00227 Kinari",
  "01031 Kindaruma",
  "10126 Kinunga",
  "60211 Kionyo",
  "80116 Kipevu",
  "30103 Kipkabus",
  "50241 Kipkarren River",
  "20202 Kipkelion",
  "30117 Kiplegetet",
  "20416 Kiplelji",
  "30203 Kipsaina",
  "30118 Kiptabach",
  "30402 Kiptagich",
  "20133 Kiptangwanyi",
  "20213 Kiptere",
  "20208 Kiptugumo",
  "20131 Kirengeti",
  "10204 Kiriaini",
  "60116 Kirie",
  "20605 Kirimun",
  "20135 Kirisoi",
  "60113 Kiritiri",
  "50313 Kiritu",
  "01017 Kiriua",
  "20130 Kirobon",
  "01018 Kiruara",
  "20144 Kisanana",
  "90204 Kisasi",
  "00206 Kiserian",
  "40200 Kisii",
  "40100 Kisumu",
  "30200 Kitale",
  "90124 Kithimani",
  "60114 Kithimu",
  "90144 Kithyoko",
  "90303 Kitise",
  "80316 Kitivo",
  "90200 Kitui",
  "01019 Kiunyu",
  "90218 Kiusyani",
  "90116 Kivaani",
  "90111 Kivunga",
  "30305 Kobujoi",
  "50420 Kocholya",
  "40316 Kodula",
  "20136 Koige",
  "30314 Koilot",
  "20417 Koiwa",
  "40317 Kojwang",
  "90108 Kola",
  "50217 Kolanya",
  "40102 Kombewa",
  "40103 Kondele",
  "40121 Kondik",
  "00212 Konza",
  "40644 Kopolo",
  "40639 Koracha",
  "40104 Koru",
  "50117 Koyonzo",
  "20224 Kurabei",
  "10304 Kutus",
  "80403 Kwale",
  "30210 Kwanza",
  "90215 Kwavonza",
  "90209 Kyeni",
  "90401 Kyuso",
  "60601 Laare",
  "30126 Laboret",
  "40144 Labuiywo",
  "40122 Ladhri Awasi",
  "80500 Lamu",
  "10139 Lamuria",
  "20112 Lanet",
  "30112 Langas",
  "00509 Langata",
  "00603 Lavington",
  "40134 Lela",
  "20506 Lengita",
  "30115 Leseru",
  "20310 Leshau",
  "30302 Lessos",
  "80110 Likoni",
  "00217 Limuru",
  "90109 Lita",
  "20210 Litein",
  "30500 Lodwar",
  "00209 Loitokitok",
  "60501 Loiyangalani",
  "30505 Lokichar",
  "30503 Lokichoggio",
  "30504 Lokitaung",
  "30506 Lokori",
  "40701 Lolgorian",
  "40128 Lolwe",
  "20203 Londiani",
  "20402 Longisa",
  "20146 Longonot",
  "30507 Lorugum",
  "00604 Lower Kabete",
  "50307 Luanda",
  "50219 Luandanyi",
  "50240 Luandeti",
  "50118 Lubao",
  "50108 Lugari",
  "40622 Lugingo",
  "50218 Lugulu",
  "40623 Luhano",
  "50421 Lukolis",
  "80408 Lukore",
  "50132 Lukume",
  "50230 Lukusi",
  "50242 Lumakanda",
  "80402 Lunga Lunga",
  "50119 Lunza",
  "50120 Lurambi",
  "00905 Lusingeti",
  "50320 Lusiola",
  "50121 Lutaso",
  "50220 Lwakhakha   ",
  "20147 Maai Mahiu",
  "50235 Mabusi",
  "90100 Machakos",
  "01002 Madaraka",
  "40641 Madeya",
  "40613 Madiany",
  "80207 Madina",
  "50321 Magada",
  "00205 Magadi",
  "40624 Mageta",
  "50325 Mago",
  "40507 Magombo",
  "60403 Magumoni",
  "40307 Magunga",
  "60407 Magutuni",
  "40508 Magwagwa",
  "50322 Mahanga",
  "20148 Maiella",
  "20314 Mairo Inya",
  "20145 Maji Mazuri",
  "20228 Makimeny",
  "20418 Makimeny",
  "90138 Makindu",
  "00510 Makongeni",
  "80315 Maktau",
  "90300 Makueni",
  "20149 Makumbi",
  "50133 Makunga",
  "80112 Makupa",
  "20141 Makutano",
  "01020 Makuyu",
  "50122 Malaha",
  "50209 Malakisi",
  "50103 Malava",
  "50221 Maliki",
  "80200 Malindi",
  "50123 Malinya",
  "70300 Mandera",
  "40509 Manga",
  "80301 Manyani",
  "60101 Manyatta",
  "40625 Manyuanda",
  "50126 Manyulia",
  "10221 Maragi",
  "50300 Maragoli",
  "10205 Maragua",
  "20600 Maralal",
  "40214 Marani",
  "80113 Mariakani",
  "30403 Marigat",
  "60408 Marima",
  "60215 Marimanti",
  "40318 Marinde",
  "40408 Mariwa",
  "20322 Marmanet",
  "60500 Marsabit",
  "10127 Marua",
  "50324 Masana",
  "40105 Maseno",
  "80312 Mashini",
  "01103 Mashuru",
  "90101 Masii",
  "40215 Masimba",
  "90141 Masinga",
  "01009 Mataara",
  "00221 Matathia",
  "50422 Matayos",
  "50222 Mateka",
  "50136 Matete",
  "00611 Mathare Valley",
  "00211 Matheini",
  "90406 Mathuki",
  "90140 Matiliku",
  "90210 Matinyani",
  "50223 Matokho",
  "80406 Matuga",
  "30205 Matunda",
  "90119 Matuu",
  "20111 Mau Narok",
  "20122 Mau Summit",
  "60600 Maua",
  "50124 Mautuma",
  "90304 Mavindini",
  "40310 Mawego",
  "50224 Mayanja",
  "80114 Mazeras",
  "00503 Mbagathi",
  "50236 Mbakalo",
  "00231 Mbari Ya Njiku",
  "40305 Mbita",
  "90214 Mbitini",
  "90110 Mbiuni",
  "00616 Mbono Road",
  "90127 Mbumbuni",
  "90142 Mbusyani",
  "00504 Mchumbi Road",
  "20104 Menengai",
  "20419 Merigi",
  "60200 Meru",
  "40319 Mfangano",
  "80313 Mgambonyi",
  "80306 Mgange",
  "60604 Miathene",
  "01029 Migioini",
  "90402 Migwani",
  "20301 Miharati",
  "10128 Mihuti",
  "40225 Mikayi",
  "60607 Mikinduri",
  "60208 Mikumbuni",
  "20123 Milton Siding",
  "20124 Mirangine",
  "40320 Mirogi",
  "50207 Misikhu",
  "40626 Misori",
  "90104 Mitaboni",
  "60204 Mitunguu",
  "90112 Miu",
  "40106 Miwani",
  "80106 Mkomani",
  "20312 Mochongoi",
  "20403 Mogogosiek",
  "40216 Mogonga",
  "20105 Mogotio",
  "80115 Moi Airport",
  "00700 Moi Avenue",
  "30104 Moi Ben",
  "30107 Moi University",
  "30202 Moi's Bridge",
  "40510 Mokomoni",
  "80502 Mokowe",
  "20106 Molo",
  "80100 Mombasa",
  "40207 Mosocho",
  "30307 Mosoriot",
  "20125 Mosque Road",
  "60700 Moyale",
  "50323 Mpaka",
  "80503 Mpeketoni",
  "80404 Msambweni",
  "90128 Mtito Andei",
  "80111 Mtongwe",
  "80117 Mtopanga",
  "80109 Mtwapa",
  "50423 Mubwayo",
  "10222 Muchungucha",
  "70102 Muddo Gashe",
  "40627 Mudhiero",
  "00228 Muguga",
  "01021 Mugumoini",
  "10129 Mugunda",
  "00234 Muhoho",
  "40107 Muhoroni",
  "20323 Muhotetu",
  "40409 Muhuru Bay",
  "01022 Mukarara",
  "01023 Mukerenju",
  "20315 Mukeu",
  "50225 Mukhe",
  "40410 Mukuro",
  "10103 Mukurweini",
  "90216 Mulango",
  "50428 Muluanda",
  "50102 Mumias",
  "50134 Munami",
  "50424 Mundika",
  "00235 Mundoro",
  "50425 Mungatsi",
  "10130 Munyu",
  "10200 Muranga",
  "10228 Murarandia",
  "01024 Muruka",
  "50426 Murumba",
  "20316 Murungaru",
  "60120 Mururi",
  "50125 Musanda",
  "90211 Mutha",
  "60605 Muthaara",
  "00619 Muthaiga",
  "90113 Muthetheni",
  "10131 Muthinga",
  "10223 Muthithi",
  "90117 Mutituni",
  "90201 Mutomo",
  "60606 Mutuati",
  "40628 Mutumbu",
  "90114 Muumandu",
  "90102 Mwala",
  "80305 Mwatate",
  "10104 Mweiga",
  "10132 Mweru",
  "90400 Mwingi",
  "50226 Myanga",
  "20504 Nairage Enkare",
  "00100 Nairobi",
  "20142 Naishi",
  "50211 Naitiri",
  "20117 Naivasha",
  "20100 Nakuru",
  "50227 Nalondo",
  "00207 Namanga",
  "50127 Nambacha",
  "50409 Nambale",
  "50231 Namorio",
  "30301 Nandi Hills",
  "50228 Nandolia",
  "50239 Nangili",
  "40615 Nango",
  "10400 Nanyuki",
  "10105 Naro Moru",
  "20505 Naro Sura",
  "20500 Narok",
  "01025 Ndakaini",
  "90118 Ndalani",
  "30123 Ndalat",
  "30219 Ndalu",
  "50212 Ndalu",
  "20404 Ndanai",
  "20306 Ndaragwa",
  "20420 Ndaraweta",
  "00230 Ndenderu",
  "40629 Ndere",
  "00229 Nderu",
  "40302 Ndhiwa",
  "40630 Ndigwa",
  "40321 Ndiru",
  "01016 Ndithini",
  "50229 Ndiyisi",
  "90202 Ndooa",
  "40602 Ndori",
  "20317 Ndunyu Njeru",
  "80311 Ngambwa",
  "60115 Nganduri",
  "20308 Ngano",
  "00600 Ngara Road",
  "20328 Ngarua",
  "00218 Ngecha",
  "20324 Ngelesha",
  "00901 Ngewa",
  "30404 Nginyang",
  "40603 Ngiya",
  "01012 Ngoliba",
  "10229 Ngonda",
  "00208 Ngong Hills",
  "00505 Ngong Road",
  "20126 Ngorika",
  "00225 Ngorongo",
  "90407 Nguni",
  "10224 Nguyoini",
  "90129 Ngwata",
  "40702 Njipiship",
  "20107 Njoro",
  "60214 Nkondi",
  "60202 Nkubu",
  "20154 North Kinangop",
  "20318 North Kinangop",
  "40417 Ntimaru",
  "90130 Nunguni",
  "90408 Nuu",
  "40124 Nyabondo",
  "40322 Nyaburi",
  "40217 Nyacheki",
  "40631 Nyadorera",
  "20300 Nyahururu",
  "40125 Nyakwere",
  "80118 Nyali",
  "40203 Nyamache",
  "40206 Nyamarambe",
  "40205 Nyambunwa",
  "40500 Nyamira",
  "40632 Nyamonye",
  "40419 Nyamtiro",
  "40126 Nyangande",
  "40127 Nyangori",
  "40218 Nyangusu",
  "40311 Nyangweso",
  "40502 Nyansiongo",
  "40219 Nyanturago",
  "40514 Nyaramba",
  "30131 Nyaru",
  "40402 Nyatike",
  "40633 Nyawara",
  "00506 Nyayo Stadium",
  "10100 Nyeri",
  "40611 Nyilima",
  "90136 Nzeeka",
  "90143 Nziu",
  "90308 Nziu",
  "50237 Nzoia",
  "50427 Obekai",
  "40129 Oboch",
  "40204 Ogembo",
  "40130 Ogen",
  "40323 Ogongo",
  "90301 Okia",
  "20229 Ol Butyo",
  "20302 Ol Joro Orok",
  "20303 Ol Kalou",
  "20421 Olbutyo",
  "20152 Olenguruone",
  "20502 Olkurto",
  "20503 Olololunga",
  "20424 Oloomirani",
  "20507 Oloomirani",
  "00213 Oltepesi",
  "40306 Omboga",
  "40221 Omogonchoro",
  "00511 Ongata Rongai",
  "40227 Oriang",
  "30602 Ortum",
  "40324 Otaro",
  "10106 Othaya",
  "40411 Othoch Rakuom",
  "40224 Othoro",
  "40108 Otonglo",
  "40222 Oyugis",
  "40329 Pala",
  "40111 Pap Onditi",
  "00623 Parklands",
  "20311 Passenga",
  "40131 Paw Akuche",
  "40113 Pembe Tatu",
  "30116 Plateau",
  "50410 Port Victoria",
  "00624 Quarry Road",
  "40132 Rabuor",
  "00617 Racecourse Road",
  "40604 Ragengni",
  "40325 Rakwaro",
  "40330 Ramba",
  "40142 Ramula",
  "40412 Ranen",
  "40634 Rangala",
  "40303 Rangwe",
  "40403 Rapogi",
  "40137 Ratta",
  "40133 Reru",
  "70302 Rhamu",
  "40511 Rigoma",
  "40226 Ringa",
  "40512 Riochanda",
  "40220 Riosiri",
  "00512 Riruta",
  "40326 Rodi Kopany",
  "00300 Ronald Ngala Street",
  "20127 Ronda",
  "20108 Rongai",
  "40404 Rongo",
  "20204 Roret",
  "00618 Ruaraka",
  "00232 Ruiru",
  "20321 Rumuruti",
  "60103 Runyenjes",
  "20313 Ruri",
  "10133 Ruringu",
  "40327 Rusinga",
  "10134 Ruthangati   ",
  "10208 Saba Saba",
  "20143 Sabatia",
  "30211 Saboti",
  "80308 Sagalla",
  "10230 Sagana",
  "80120 Samburu",
  "50128 Samitsi",
  "40405 Sare",
  "00606 Sarit Centre",
  "00513 Sasumua Road",
  "40612 Sawagongo",
  "40614 Sega",
  "50308 Serem",
  "30407 Seretunin",
  "20150 Shabaab",
  "50106 Shianda",
  "50129 Shiatsala",
  "50130 Shibuli",
  "50131 Shimanyiro",
  "80407 Shimba Hills",
  "50107 Shinyalu",
  "60104 Siakago",
  "40600 Siaya",
  "40605 Sidindi",
  "40643 Sifuyo",
  "40635 Sigomre",
  "20405 Sigor",
  "40135 Sigoti",
  "20212 Sigowet",
  "30217 Sikinwa",
  "20422 Silibwet",
  "30127 Simat",
  "40308 Sindo",
  "30703 Singore",
  "50401 Sio Port",
  "20230 Siongiroi",
  "20423 Siongiroi",
  "20326 Sipili",
  "40636 Sirembe",
  "30213 Sirende",
  "50208 Sirisia",
  "40642 Sirongo",
  "20128 Solai",
  "60701 Sololo",
  "40109 Sondu",
  "40110 Songhor",
  "20223 Sorget",
  "20205 Sosiot",
  "20227 Sotik",
  "20406 Sotik",
  "20604 South Horr",
  "20155 South Kinangop",
  "20319 South Kinangop",
  "30105 Soy",
  "40418 Suba Kuria",
  "20109 Subukia",
  "20602 Suguta Mar Mar",
  "20151 Sulmac",
  "90132 Sultan Hamud",
  "40400 Suna",
  "30212 Suwerwa",
  "30220 Tabani",
  "50238 Tabani",
  "90131 Tala",
  "30704 Tambach",
  "80203 Tarasaa",
  "80309 Tausa",
  "80302 Taveta",
  "90133 Tawa",
  "30405 Tenges",
  "10110 Thaara",
  "10135 Thangathi",
  "01026 Thare",
  "00210 Thigio",
  "01000 Thika",
  "60210 Tigiji",
  "10402 Timau",
  "60203 Timau",
  "20110 Timber Mill Road",
  "30108 Timboroa",
  "50309 Tiriki",
  "00400 Tom Mboya",
  "40513 Tombe",
  "30218 Tongaren",
  "20153 Torongo",
  "30707 Tot",
  "90409 Tseikuru",
  "90203 Tulia",
  "10136 Tumu Tumu",
  "60213 Tunyai",
  "30106 Turbo",
  "20129 Turi",
  "10137 Uaso Nyiro",
  "40606 Ugunja",
  "00517 Uhuru Gardens",
  "80400 Ukunda",
  "40607 Ukwala",
  "00222 Uplands",
  "40608 Uranga",
  "40228 Uriri",
  "40609 Usenge",
  "40637 Usigu",
  "00605 Uthiru",
  "00514 Valley Arcade",
  "50310 Vihiga",
  "00621 Village Market",
  "80119 Vipingo",
  "80211 Vitengeni",
  "00507 Viwandani",
  "80300 Voi",
  "90212 Voo",
  "40638 Wagusu",
  "00613 Waithaka",
  "70200 Wajir",
  "10138 Wamagana",
  "20603 Wamba",
  "90103 Wamunyu",
  "01010 Wamwangi",
  "00614 Wangige",
  "10303 Wanguru",
  "10225 Wanjengi",
  "20305 Wanjohi",
  "80204 Watalii Road",
  "80202 Watamu",
  "50205 Webuye",
  "30603 Weiwei",
  "80303 Werugha",
  "00800 Westlands",
  "40141 Winam",
  "80504 Witu",
  "20329 Wiyumiririe",
  "50311 Wodanga",
  "80304 Wundanyi",
  "40610 Yala",
  "00508 Yaya Towers",
  "90134 Yoani30214 Ziwa",
  "90213 Zombe "
  ]

  //List Update
  const [beneficiary, setBeneficiary] = useState([]);

  //Get pending pension transfers
  const beneficiaries = () => {
    Axios.post(domain + "/beneficiaries", {}).then((response) => {
      console.log(response);
      if (response.data == "No beneficiaries") {
        console.log(response);

        setBeneficiary([
          {
            firstname: "No beneficiary",
            lastname: "",
            benefit: 0,
          },
        ]);
      } else {
        console.log(response);
        setBeneficiary(response.data);
      }
    });
  };

  //Login status
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    Axios.post(domain + "/auth", {}).then((response) => {
      if (response.data.message == "Not authenticated") {
        window.history.go(-1);
      } else {
        setLoginStatus("true");
       
      }
    });
  };

  var backArrow;

  backArrow = (
    <Link to="/userDashboard">
      <span>
        <Icon className="back-arrow" name="arrow left" />
        Back
      </span>
    </Link>
  );

  //User Profile data

  const [userName, setUserName] = useState();

  let onChange = (event) => {
    const newValue = event.target.value;
    setUserName(newValue);
  };

  //Update username on the backend
  const updateUserName = () => {
    Axios.post(domain + "/updateUserName", {
      userName: userName,
    }).then((response) => {});
  };

  const [userEmail, setUserEmail] = useState();

  let onChange1 = (event) => {
    const newValue = event.target.value;
    setUserEmail(newValue);
  };

  //Update userEmail on the backend
  const updateUserEmail = () => {
    Axios.post(domain + "/updateUserEmail", {
      userEmail: userEmail,
    }).then((response) => {});
  };

  const [userPhone, setUserPhone] = useState();

  let onChange2 = (event) => {
    const newValue = event.target.value;
    setUserPhone(newValue);
  };

  //Update userPhone on the backend
  const updateUserPhone = () => {
    Axios.post(domain + "/updateUserPhone", {
      userPhone: userPhone,
    }).then((response) => {});
  };

  const [userID, setUserId] = useState();

  let onChange3 = (event) => {
    const newValue = event.target.value;
    setUserId(newValue);
  };

  var age;

  //Update userId on the backend
  const updateUserId = () => {
    Axios.post(domain + "/updateUserId", {
      userID: userID,
    }).then((response) => {});
  };

  const [dob, setDob] = useState();

  //DOB Validation
  let onChange4 = (event) => {
    const newValue = event.target.value;
    setDob(newValue);

  };

  //Update dob on the backend
  const updateDOB = () => {
    Axios.post(domain + "/updateDOB", {
      dob: dob,
    }).then((response) => {});
  };

  const [employmentStatus, setEmploymentStatus] = useState("Employed");

  const handleSelect = (event) => {
    setEmploymentStatus(event.target.value);
  };

  //Update employmentStatus on the backend
  const updateEmploymentStatus = () => {
    Axios.post(domain + "/updateEmploymentStatus", {
      employmentStatus: employmentStatus,
    }).then((response) => {});
  };

  //Get profile details from backend

  const getProfile = () => {
    beneficiaries();
    checkAddress();
    Axios.post(domain + "/getProfile", {}).then((response) => {
      setUserName(response.data[0].name);
      setUserEmail(response.data[0].email);
      setUserPhone(response.data[0].phone);
      setEmploymentStatus(response.data[0].employment_status);
      setUserId(response.data[0].id_no);

      var strPos = response.data[0].dob.slice(0, 10);
      setDob(strPos);
    });
  };

  //------------Beneficiary details----------
  const [beneficiaryFirstName, setbeneficiaryFirstName] = useState();

  let onChange5 = (event) => {
    const newValue = event.target.value;
    setbeneficiaryFirstName(newValue);
  };

  const [beneficiaryLastName, setbeneficiaryLastName] = useState();

  let onChange6 = (event) => {
    const newValue = event.target.value;
    setbeneficiaryLastName(newValue);
  };

  const [beneficiarydob, setbeneficiarydob] = useState();

  const [Minor, setMinor] = useState("false");

  let onChange7 = (event) => {
    const newValue = event.target.value;
    setbeneficiarydob(newValue);

    
    var dob = new Date(newValue);

    if (newValue == "") {
    } else {
      //calculate month difference from current date in time
      var month_diff = Date.now() - dob.getTime();

      //convert the calculated difference in date format
      var age_dt = new Date(month_diff);

      //extract year from date
      var year = age_dt.getUTCFullYear();

      //now calculate the age of the user
      age = Math.abs(year - 1970);
    }

    if (age < 18) {
      setMinor("true");
    } else {
      setMinor("false");
    }
  };

  //Guardian credentials
  const [guardianFirstname, setGuardianFirstname] = useState();

  let onChange9 = (event) => {
    const newValue = event.target.value;
    setGuardianFirstname(newValue);
  };

  const [guardianLastname, setGuardianLastname] = useState();

  let onChange10 = (event) => {
    const newValue = event.target.value;
    setGuardianLastname(newValue);
  };

    //Guardian credentials
    const [guardianDOB, setGuardianDOB] = useState();

    const [guardianAge, setGuardianAge] = useState();

    let onChange11 = (event) => {
      const newValue = event.target.value;
      setGuardianDOB(newValue);
      
      var dob = new Date(newValue);

      if (newValue == "") {
      } else {
        //calculate month difference from current date in time
        var month_diff = Date.now() - dob.getTime();
  
        //convert the calculated difference in date format
        var age_dt = new Date(month_diff);
  
        //extract year from date
        var year = age_dt.getUTCFullYear();
  
        //now calculate the age of the user
        age = Math.abs(year - 1970);
      }
  
      if (age < 18) {
        setGuardianAge("minor");
      } else {
        setGuardianAge("Adult");
      }
    };

  //Benefit limit
  const [benefit, setBenefit] = useState(50);

  let checkBenefit = (event) => {
    const newValue = event.target.value;
    setBenefit(newValue);
  };

    //Check Address function

    const [address, setAddress] = useState("Address not provided");

    const checkAddress = () =>{
      Axios.post(domain + "/getAddress", {}).then((response) => {
        console.log(response);
      if(response.data[0].address == "Address not found!" || response.data[0].address == "" || response.data[0].address == null){
        setAddress("Address not provided");
      }
      else{
        setAddress(response.data[0].address);
      }
      
      });
    }

  
  //Relative r/s

  const [value, setValue] = React.useState("Son");

  const handleRelativeSelect = (event) => {
    setValue(event.target.value);
  };

  const [rType, setRType] = useState();

  let onChange8 = (event) => {
    const newValue = event.target.value;
    setRType(newValue);
  };

  var beneficiaryRelationship;

  var relationship;

  const beneficaryR = value;

  if(beneficaryR == "Other relative"){
    beneficiaryRelationship = (
      <label for="rType">
        <b>Define relationship of other relative{" "}
          <span oncChange={onChange3} className="optional-field-text">
            (e.g. nephew)
          </span>
        </b>
        <br />
        <br />
        <input
          onChange={onChange8}
          type="text"
          className="inputbox"
          id="rType"
          placeholder="Relationship"
          required
        />
      </label>
    );

    relationship = rType;
  }
  else{
    beneficiaryRelationship ="";
    relationship = value;
  }

    //a function to handle the change event of the search input field and update the search value in the state.
    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
      setShow(true);
    };
  
  
  // value of the search input field and a list of suggestions.
  const [searchValue, setSearchValue] = useState("");
  var suggestions = KenyaAddresses;

  const [show, setShow] = React.useState(false);

  const ItemList = (() => {
    if (!show) return [];
    return suggestions
      .filter((v) => v.toLowerCase().includes(searchValue.toLowerCase()))
      .map((v) => (
        <button
          onClick={() => {
            setSearchValue(() => v);
            setShow(false);
          }}
          key={v}
        >
          {v}
        </button>
      ));
  })();

      //Send beneficiary details to the backend
      const insertBenefeciary = () => {
        if(Minor == "true"){
          if((beneficiaryFirstName  == "" || beneficiaryFirstName  == null) || (beneficiaryLastName  == "" || beneficiaryLastName  == null) || (beneficiarydob  == "" || beneficiarydob  == null) || (guardianFirstname  == "" || guardianFirstname  == null) || (guardianLastname  == "" || guardianLastname  == null) || (guardianDOB  == "" || guardianDOB == null)){
            alert("Please fill in the field'(s) appropriately");
          }
          else{
          if(guardianAge == "minor"){
            alert("Guardian must be 18 years and above!");
          }
          else{
            Axios.post(domain + "/beneficiaryDetails", {
              beneficiaryFirstName: beneficiaryFirstName,
              beneficiaryLastName: beneficiaryLastName,
              beneficiarydob: beneficiarydob,
              benefit: benefit,
              relationship: relationship,
              guardianFirstname: guardianFirstname,
              guardianLastname: guardianLastname,
              guardianDOB: guardianDOB,
              
            }).then((response) => {
              if(response.data == "Beneficiary added successfully"){
                beneficiaries();
              }
              else{
                let r = response.data;
                alert(r);
              }
              console.log(response);
            });
  
         }
        }
        }
        else{
          if((beneficiaryFirstName  == "" || beneficiaryFirstName  == null) || (beneficiaryLastName  == "" || beneficiaryLastName  == null) || (beneficiarydob  == "" || beneficiarydob  == null)){
            alert("Please fill in the field'(s) appropriately");
          }
          else{
          if(guardianAge == "minor"){
            alert("Guardian must be 18 years and above!");
          }
          else{
            Axios.post(domain + "/beneficiaryDetails", {
              beneficiaryFirstName: beneficiaryFirstName,
              beneficiaryLastName: beneficiaryLastName,
              beneficiarydob: beneficiarydob,
              benefit: benefit,
              relationship: relationship,
              guardianFirstname: guardianFirstname,
              guardianLastname: guardianLastname,
              guardianDOB: guardianDOB,
              
            }).then((response) => {
              if(response.data == "Beneficiary added successfully"){
                beneficiaries();
              }
              else{
                let r = response.data;
                alert(r);
              }
              console.log(response);
            });
  
         }
        }
        }

           
      };

      //Check if beneficiary is a minor
      var BeneficiaryAge;
      var AddGuardian;

      if(Minor == "true"){

        BeneficiaryAge = (
          <select
          class="save-dropdown inputbox"
          value={value}
          id="Employment-status"
          onChange={handleRelativeSelect}
        >
          document.write("e");
          <option value="Son">Son</option>
          <option value="Daughter">Daughter</option>
          <option value="Sister">Sister</option>
          <option value="Brother">Brother</option>
          <option value="Other relative">Other</option>
        </select>
        )

        AddGuardian = (
          <div>
            <b>Guardian Firstname</b>
            <br />
            <br />
            <input
              onChange={onChange9}
              type="text"
              className="inputbox"
              id="firstname"
              placeholder="Enter first name"
              required
            />
            <br />
            <br />
            <b>Guardian Lastname</b>
            <br />
            <br />
            <input
              onChange={onChange10}
              type="text"
              className="inputbox"
              id="lastname"
              placeholder="Enter Last name"
              required
            />
            <br />
            <br />
            <b>Guardian DOB</b>
            <br />
            <br />
            <input
              type="date"
              onChange={onChange11}
              className="inputbox"
              id="beneficiarydob"
              placeholder="Enter Date of birth"
              required
            />
            <br/>
            <br/>
          </div>
        )
      }
      else{
        BeneficiaryAge = (
          <select
          class="save-dropdown inputbox"
          value={value}
          id="Employment-status"
          onChange={handleRelativeSelect}
        >
          document.write("e");
          <option value="Mother">Mother</option>
          <option value="Father">Father</option>
          <option value="Son">Son</option>
          <option value="Daughter">Daughter</option>
          <option value="Sister">Sister</option>
          <option value="Brother">Brother</option>
          <option value="Other relative">Other</option>
        </select>
        )

        AddGuardian = (
          <div>
            
          </div>
        )
      }

    //Hide hideSearchList function
    const hideSearchList = () => {
      setShow(false);
    };

    var addressInput;
    addressInput = searchValue;

    //Send address to backend
    const insertAddress = () => {
      Axios.post(domain + "/clientAddress", {
        addressInput: addressInput,
        
      }).then((response) => {});

      checkAddress();
    }

  return (
    <div
      onLoadCapture={checkLogin}
      onLoad={getProfile}
      className="container-fluid account-section"
    >
      <div class="container">
        <>
          <Router>
            <Switch>
              <Route exact path="/profile">
                <NavbarSignedIn />
              </Route>
            </Switch>
          </Router>
        </>
        {backArrow}
      </div>
      <div className="row" onClick = {hideSearchList}>
        <div className="col-lg-4">
          <div className="dashboardBlueDiv fadeInLeft">
            <h1>Profile</h1>
          </div>
        </div>
        <div className="col-lg-4 beneficiariesUpdate fadeInRight">
          <h2>Beneficiaries</h2>
          <div className="listUpdateContainer">
            {beneficiary.map((benefitiary) => (
              <li class="pendingTransfer">
                <span className="pendingTransferProviderName">
                  {benefitiary.firstname} &nbsp; {benefitiary.lastname} &nbsp;
                  &nbsp; (Benefit: {benefitiary.benefit}%)
                </span>
                <span className="d-flex justify-content-end">
                  <span className="progressStatus"></span>
                </span>
              </li>
            ))}
          </div>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample7"
            data-bs-target="#collapseExample7"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample7"
          >
            Add Beneficiary
          </a>
          <div class="collapse" id="collapseExample7">
            <div class="updateCard">
              <b>Firstname</b>
              <br />
              <br />
              <input
                onChange={onChange5}
                type="text"
                className="inputbox"
                id="firstname"
                placeholder="Enter first name"
                required
              />
              <br />
              <br />
              <b>Lastname</b>
              <br />
              <br />
              <input
                onChange={onChange6}
                type="text"
                className="inputbox"
                id="lastname"
                placeholder="Enter Last name"
                required
              />
              <br />
              <br />
              <b>DOB</b>
              <br />
              <br />
              <input
                type="date"
                onChange={onChange7}
                className="inputbox"
                id="beneficiarydob"
                placeholder="Enter Date of birth"
                required
              />
              <br/>
              <br/>
              <label for="Employment-status">
                <b>Relationship</b>
                <br />
                <br />
               {BeneficiaryAge}
              </label>
              <br/>
              <br/>
              {beneficiaryRelationship}
              <br />
              <br />
              <label for="status" className="statusLabel">
                <span>
                  <b>Benefit Limit</b>
                  <span className="optional-field-text">(1% - 100%)</span>
                </span>
                <br />
                <br />
                <div className="statusBubble d-flex justify-content-center">
                  <div className="bubble">{benefit}%</div>
                </div>
                <input
                  type="range"
                  min={"1"}
                  max={"100"}
                  className="inputbox"
                  id="status"
                  list="tickmarks"
                  onChange={checkBenefit}
                />
                <datalist id="tickmarks">
                  <option value="0" label="0%"></option>
                  <option value="25" label="25%"></option>
                  <option value="50" label="50%"></option>
                  <option value="75" label="75%"></option>
                  <option value="100" label="100%"></option>
                </datalist>
              </label>
              <br/>
              <br/>
             {AddGuardian}
              <button
               onClick={insertBenefeciary}
               className="createACC-btn"
               data-bs-toggle="collapse"
               href="#collapseExample7"
               data-bs-target="#collapseExample7"
               role="button"
               aria-expanded="false"
               aria-bs-controls="collapseExample7"
               >
                Submit
              </button>
            </div>
          </div>
          <div className="addressContainer fadeInRight">
            <h2>Address</h2>
            <div className="listUpdateContainer Addresscheck">
                {address}
            </div>
            <a
              data-bs-toggle="collapse"
              href="#collapseExample8"
              data-bs-target="#collapseExample8"
              role="button"
              aria-expanded="false"
              aria-bs-controls="collapseExample8"
            >
              Update Home Address
            </a>
            <div class="collapse" id="collapseExample8">
              <div class="updateCard">
                <b>Address</b>
                <br />
                <br />
                <input
                  onChange={handleSearchChange}
                  type="text"
                  className="inputbox"
                  id="Address"
                  placeholder="Enter address"
                  value={searchValue}
                />
                <div className="list">{ItemList}</div>
                <br />
                <br />

                <button
               onClick={insertAddress} 
               className="createACC-btn"
               data-bs-toggle="collapse"
               href="#collapseExample8"
               data-bs-target="#collapseExample8"
               role="button"
               aria-expanded="false"
               aria-bs-controls="collapseExample8"
               >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 updateProfile fadeInUp">
          <hr className="separator" />
          <b>Name:</b> {userName}
          <br/>
          <br />
          <hr className="separator" />
          <b>Email:</b> {userEmail}
          <br />
          <br />
          <a
            data-bs-toggle="collapse"
            href="#collapseExample2"
            data-bs-target="#collapseExample2"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample2"
          >
            Update
          </a>
          <div class="collapse" id="collapseExample2">
            <div class="updateCard">
              <input
                onChange={onChange1}
                type="email"
                name="email"
                className="inputbox"
                id="email"
                placeholder="Email address"
                required
              />
              <button onClick={updateUserEmail} className="createACC-btn">
                Submit
              </button>
              <br />
              <b>Note:</b>
              <span>
                Kindly note that after changing your email you'll be required to
                use it to login.
              </span>
            </div>
          </div>
          <br />
          <br />
          <hr className="separator" />
          <b>Phone:</b> {userPhone}
          <br />
          <br />
          <a
            data-bs-toggle="collapse"
            href="#collapseExample3"
            data-bs-target="#collapseExample3"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample3"
          >
            Update
          </a>
          <div class="collapse" id="collapseExample3">
            <div class="updateCard">
              <input
                type="number"
                onChange={onChange2}
                name="phoneNumber"
                className="inputbox"
                id="name"
                placeholder="Enter your phone number"
                required
              />
              <button onClick={updateUserPhone} className="createACC-btn">
                Submit
              </button>
            </div>
          </div>
          <br />
          <br />
          <hr className="separator" />
          <b>ID number:</b> {userID}
          <br />
          <br />
          <hr className="separator" />
          <b>DOB:</b> {dob}
          <br />
          <br />
          <a
            data-bs-toggle="collapse"
            href="#collapseExample5"
            data-bs-target="#collapseExample5"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample5"
          >
            Update
          </a>
          <div class="collapse" id="collapseExample5">
            <div class="updateCard">
              <input
                type="date"
                onChange={onChange4}
                className="inputbox"
                id="dob"
                placeholder="Enter Date of birth"
                required
              />
              <button onClick={updateDOB} className="createACC-btn">
                Submit
              </button>
            </div>
          </div>
          <br />
          <br />
          <hr className="separator" />
          <b>Employment Status:</b> {employmentStatus}
          <br />
          <br />
          <a
            data-bs-toggle="collapse"
            href="#collapseExample6"
            data-bs-target="#collapseExample6"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample6"
          >
            Update
          </a>
          <div class="collapse" id="collapseExample6">
            <div class="updateCard">
              <select
                class="save-dropdown inputbox"
                value={employmentStatus}
                id="Employment-status"
                onChange={handleSelect}
              >
                document.write("e");
                <option id="question" value="Employed">
                  Employed
                </option>
                <option value="Self-employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
              <button
                onClick={updateEmploymentStatus}
                className="createACC-btn"
              >
                Submit
              </button>
            </div>
          </div>
          <br />
          <br />
          <hr className="separator" />
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
