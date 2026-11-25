"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"

interface EventLocation {
  name: string
  country: string
  description: string
  coordinates: { x: number; y: number }
}

const eventLocations: EventLocation[] = [
  { name: "ETHDenver", country: "USA", description: "Denver, Colorado", coordinates: { x: 17, y: 17 } },
  { name: "EthCC", country: "Europe", description: "A different city each year", coordinates: { x: 47, y: 16 } },
  { name: "Token2049 Singapore", country: "Singapore", description: "Singapore", coordinates: { x: 79, y: 32 } },
  { name: "Token2049 Dubai", country: "UAE", description: "Dubai", coordinates: { x: 62, y: 24 } },
  { name: "Consensus Hong Kong", country: "Hong Kong", description: "Hong Kong", coordinates: { x: 81, y: 23 } },
  { name: "Consensus Austin", country: "USA", description: "Austin, Texas", coordinates: { x: 19, y: 20 } },
  { name: "Consensus New York", country: "USA", description: "New York", coordinates: { x: 26, y: 15 } },
  { name: "ETHIndia", country: "India", description: "India", coordinates: { x: 70, y: 28 } },
  { name: "ETHGlobal New York", country: "USA", description: "New York", coordinates: { x: 26, y: 15 } },
  { name: "ETHGlobal India", country: "India", description: "India", coordinates: { x: 70, y: 28 } },
  { name: "Devcon Thailand", country: "Thailand", description: "Bangkok", coordinates: { x: 78, y: 27 } },
  { name: "Devconnect Argentina", country: "Argentina", description: "Buenos Aires", coordinates: { x: 30, y: 42 } },
  { name: "Devconnect Istanbul", country: "Turkey", description: "Istanbul", coordinates: { x: 57, y: 19 } },
  { name: "Blockchain Week Dubai", country: "UAE", description: "Dubai", coordinates: { x: 62, y: 24 } },
  { name: "Blockchain Week Paris", country: "France", description: "Paris", coordinates: { x: 47, y: 16 } },
  { name: "Blockchain Week Korea", country: "South Korea", description: "Seoul", coordinates: { x: 86, y: 19 } },
  { name: "ETHTokyo", country: "Japan", description: "Tokyo", coordinates: { x: 89, y: 18 } },
  { name: "Blockchain Week Japan", country: "Japan", description: "Tokyo", coordinates: { x: 89, y: 18 } },
  { name: "Solana Breakpoint Abu Dhabi", country: "UAE", description: "Abu Dhabi", coordinates: { x: 61, y: 25 } },
  { name: "Blockchain Week New York", country: "USA", description: "New York", coordinates: { x: 26, y: 15 } },
  { name: "Web3 Summit", country: "Germany", description: "Berlin", coordinates: { x: 51, y: 14 } },
  { name: "Blocktrain", country: "India", description: "India", coordinates: { x: 70, y: 28 } },
]

// Comprehensive high-detail dotted world map
// Coordinates on a 100x55 grid for accurate representation of all continents
const worldMapDots: [number, number][] = [
  // ==================== NORTH AMERICA ====================
  // ALASKA (western peninsula)
  [3,10],[4,10],[5,10],[3,11],[4,11],[5,11],[6,11],[4,12],[5,12],[6,12],[7,12],[5,13],[6,13],[7,13],[8,13],
  // Aleutian Islands
  [2,12],[2,13],[3,13],
  
  // CANADIAN ARCTIC ARCHIPELAGO (northern islands)
  // Ellesmere Island
  [24,3],[25,3],[26,3],[24,4],[25,4],[26,4],[27,4],
  // Devon Island
  [22,5],[23,5],[24,5],
  // Baffin Island
  [25,5],[26,5],[27,5],[28,5],[24,6],[25,6],[26,6],[27,6],[28,6],[25,7],[26,7],[27,7],[28,7],[26,8],[27,8],
  // Victoria Island
  [17,6],[18,6],[19,6],[20,6],[17,7],[18,7],[19,7],[20,7],
  // Banks Island
  [14,6],[15,6],[14,7],[15,7],
  // Other Arctic islands
  [21,5],[22,6],[23,6],[21,7],[22,7],[23,7],
  
  // GREENLAND (large island)
  [33,4],[34,4],[35,4],[36,4],[37,4],
  [32,5],[33,5],[34,5],[35,5],[36,5],[37,5],[38,5],
  [31,6],[32,6],[33,6],[34,6],[35,6],[36,6],[37,6],[38,6],[39,6],
  [31,7],[32,7],[33,7],[34,7],[35,7],[36,7],[37,7],[38,7],[39,7],
  [32,8],[33,8],[34,8],[35,8],[36,8],[37,8],[38,8],
  [33,9],[34,9],[35,9],[36,9],[37,9],
  [34,10],[35,10],[36,10],
  [35,11],[36,11],
  
  // CANADA (mainland)
  // Northern territories
  [10,8],[11,8],[12,8],[13,8],[14,8],[15,8],[16,8],[17,8],[18,8],[19,8],[20,8],[21,8],[22,8],[23,8],[24,8],
  [9,9],[10,9],[11,9],[12,9],[13,9],[14,9],[15,9],[16,9],[17,9],[18,9],[19,9],[20,9],[21,9],[22,9],[23,9],[24,9],[25,9],
  [8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],[15,10],[16,10],[17,10],[18,10],[19,10],[20,10],[21,10],[22,10],[23,10],[24,10],[25,10],[26,10],
  [8,11],[9,11],[10,11],[11,11],[12,11],[13,11],[14,11],[15,11],[16,11],[17,11],[18,11],[19,11],[20,11],[21,11],[22,11],[23,11],[24,11],[25,11],[26,11],
  [9,12],[10,12],[11,12],[12,12],[13,12],[14,12],[15,12],[16,12],[17,12],[18,12],[19,12],[20,12],[21,12],[22,12],[23,12],[24,12],[25,12],[26,12],
  [10,13],[11,13],[12,13],[13,13],[14,13],[15,13],[16,13],[17,13],[18,13],[19,13],[20,13],[21,13],[22,13],[23,13],[24,13],[25,13],[26,13],
  // Southern Canada
  [11,14],[12,14],[13,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[20,14],[21,14],[22,14],[23,14],[24,14],[25,14],[26,14],[27,14],
  
  // UNITED STATES
  // Northern states
  [12,15],[13,15],[14,15],[15,15],[16,15],[17,15],[18,15],[19,15],[20,15],[21,15],[22,15],[23,15],[24,15],[25,15],[26,15],[27,15],
  [13,16],[14,16],[15,16],[16,16],[17,16],[18,16],[19,16],[20,16],[21,16],[22,16],[23,16],[24,16],[25,16],[26,16],[27,16],
  // Central states
  [14,17],[15,17],[16,17],[17,17],[18,17],[19,17],[20,17],[21,17],[22,17],[23,17],[24,17],[25,17],[26,17],
  [15,18],[16,18],[17,18],[18,18],[19,18],[20,18],[21,18],[22,18],[23,18],[24,18],[25,18],[26,18],
  // Southern states
  [16,19],[17,19],[18,19],[19,19],[20,19],[21,19],[22,19],[23,19],[24,19],[25,19],
  [17,20],[18,20],[19,20],[20,20],[21,20],[22,20],[23,20],[24,20],[25,20],
  // Florida
  [25,21],[26,21],[27,21],[26,22],[27,22],[27,23],
  
  // MEXICO
  [16,21],[17,21],[18,21],[19,21],[20,21],[21,21],[22,21],
  [17,22],[18,22],[19,22],[20,22],[21,22],[22,22],
  [18,23],[19,23],[20,23],[21,23],[22,23],
  [19,24],[20,24],[21,24],[22,24],
  [20,25],[21,25],[22,25],
  
  // CENTRAL AMERICA (Guatemala, Belize, Honduras, El Salvador, Nicaragua, Costa Rica, Panama)
  [21,26],[22,26],[23,26],
  [22,27],[23,27],[24,27],
  [23,28],[24,28],[25,28],
  [24,29],[25,29],
  [25,30],[26,30],
  
  // CARIBBEAN ISLANDS
  // Cuba
  [26,22],[27,22],[28,22],[29,22],
  // Hispaniola (Haiti & Dominican Republic)
  [29,23],[30,23],[31,23],
  // Jamaica
  [27,24],
  // Puerto Rico
  [31,24],
  // Lesser Antilles
  [32,24],[32,25],[33,25],[33,26],
  
  // ==================== SOUTH AMERICA ====================
  // COLOMBIA & VENEZUELA
  [25,31],[26,31],[27,31],[28,31],[29,31],[30,31],[31,31],
  [24,32],[25,32],[26,32],[27,32],[28,32],[29,32],[30,32],[31,32],[32,32],
  // GUYANA, SURINAME, FRENCH GUIANA
  [31,32],[32,32],[33,32],[34,32],
  
  // ECUADOR & PERU (west coast)
  [23,33],[24,33],[25,33],[26,33],[27,33],[28,33],[29,33],[30,33],[31,33],[32,33],[33,33],[34,33],
  [23,34],[24,34],[25,34],[26,34],[27,34],[28,34],[29,34],[30,34],[31,34],[32,34],[33,34],[34,34],[35,34],
  [23,35],[24,35],[25,35],[26,35],[27,35],[28,35],[29,35],[30,35],[31,35],[32,35],[33,35],[34,35],[35,35],
  
  // BRAZIL (largest country in South America)
  [26,36],[27,36],[28,36],[29,36],[30,36],[31,36],[32,36],[33,36],[34,36],[35,36],[36,36],
  [27,37],[28,37],[29,37],[30,37],[31,37],[32,37],[33,37],[34,37],[35,37],[36,37],
  [27,38],[28,38],[29,38],[30,38],[31,38],[32,38],[33,38],[34,38],[35,38],[36,38],
  [28,39],[29,39],[30,39],[31,39],[32,39],[33,39],[34,39],[35,39],
  [28,40],[29,40],[30,40],[31,40],[32,40],[33,40],[34,40],
  
  // BOLIVIA & PARAGUAY
  [26,37],[26,38],[27,39],[26,39],[25,38],[25,39],
  
  // ARGENTINA & CHILE
  [27,41],[28,41],[29,41],[30,41],[31,41],[32,41],[33,41],
  [27,42],[28,42],[29,42],[30,42],[31,42],[32,42],
  [27,43],[28,43],[29,43],[30,43],[31,43],
  [28,44],[29,44],[30,44],[31,44],
  [28,45],[29,45],[30,45],
  [29,46],[30,46],
  [29,47],[30,47],
  [30,48],
  [30,49],
  
  // ==================== EUROPE ====================
  // ICELAND
  [38,9],[39,9],[40,9],[41,9],
  [38,10],[39,10],[40,10],[41,10],
  
  // UNITED KINGDOM & IRELAND
  // Ireland
  [40,13],[41,13],[40,14],[41,14],
  // Great Britain
  [42,12],[43,12],[42,13],[43,13],[44,13],[42,14],[43,14],[44,14],[43,15],[44,15],
  
  // SCANDINAVIA (Norway, Sweden, Finland)
  // Norway (west coast)
  [47,7],[48,7],[47,8],[48,8],[47,9],[48,9],[48,10],[49,10],[49,11],[50,11],[50,12],[51,12],
  // Sweden
  [49,7],[50,7],[51,7],[49,8],[50,8],[51,8],[52,8],[49,9],[50,9],[51,9],[52,9],[50,10],[51,10],[52,10],[51,11],[52,11],[53,11],[51,12],[52,12],[53,12],[52,13],[53,13],
  // Finland
  [52,7],[53,7],[54,7],[53,8],[54,8],[55,8],[53,9],[54,9],[55,9],[54,10],[55,10],[54,11],[55,11],[55,12],
  
  // WESTERN EUROPE
  // France
  [44,16],[45,16],[46,16],[47,16],[48,16],[44,17],[45,17],[46,17],[47,17],[48,17],[45,18],[46,18],[47,18],[48,18],[46,19],[47,19],[48,19],
  // Spain & Portugal
  [42,18],[43,18],[44,18],[45,18],[42,19],[43,19],[44,19],[45,19],[46,19],[42,20],[43,20],[44,20],[45,20],[46,20],
  // Germany, Belgium, Netherlands
  [48,13],[49,13],[50,13],[51,13],[48,14],[49,14],[50,14],[51,14],[52,14],[49,15],[50,15],[51,15],[52,15],[49,16],[50,16],[51,16],[52,16],
  // Poland
  [52,13],[53,13],[54,13],[55,13],[53,14],[54,14],[55,14],[53,15],[54,15],[55,15],
  // Austria, Switzerland, Czech Republic
  [49,17],[50,17],[51,17],[52,17],[53,17],
  
  // EASTERN EUROPE
  // Baltic States
  [54,12],[55,12],[56,12],[54,13],[55,13],[56,13],
  // Belarus, Ukraine
  [55,14],[56,14],[57,14],[58,14],[55,15],[56,15],[57,15],[58,15],[59,15],[55,16],[56,16],[57,16],[58,16],[59,16],
  // Romania, Bulgaria
  [53,18],[54,18],[55,18],[56,18],[53,19],[54,19],[55,19],[56,19],
  
  // ITALY
  [49,18],[50,18],[51,18],[49,19],[50,19],[51,19],[50,20],[51,20],[50,21],[51,21],[51,22],
  // Sicily & Sardinia
  [49,21],[52,22],[53,22],
  
  // GREECE & BALKANS
  [52,19],[53,19],[54,19],[52,20],[53,20],[54,20],[55,20],[53,21],[54,21],[55,21],[54,22],[55,22],
  // Crete
  [54,23],[55,23],
  
  // ==================== AFRICA ====================
  // NORTH AFRICA
  // Morocco
  [41,22],[42,22],[43,22],[41,23],[42,23],[43,23],[42,24],[43,24],
  // Algeria
  [44,22],[45,22],[46,22],[47,22],[48,22],[44,23],[45,23],[46,23],[47,23],[48,23],[44,24],[45,24],[46,24],[47,24],[48,24],[45,25],[46,25],[47,25],[48,25],
  // Tunisia
  [49,22],[49,23],
  // Libya
  [49,23],[50,23],[51,23],[52,23],[53,23],[49,24],[50,24],[51,24],[52,24],[53,24],[50,25],[51,25],[52,25],[53,25],
  // Egypt
  [54,23],[55,23],[56,23],[57,23],[54,24],[55,24],[56,24],[57,24],[55,25],[56,25],[57,25],
  
  // WEST AFRICA
  // Mauritania, Senegal, Mali
  [41,25],[42,25],[43,25],[44,25],[45,25],[46,25],[47,25],[48,25],[49,25],
  [40,26],[41,26],[42,26],[43,26],[44,26],[45,26],[46,26],[47,26],[48,26],[49,26],[50,26],
  // Guinea, Sierra Leone, Liberia, Ivory Coast, Ghana
  [40,27],[41,27],[42,27],[43,27],[44,27],[45,27],[46,27],[47,27],
  [41,28],[42,28],[43,28],[44,28],[45,28],[46,28],[47,28],
  // Nigeria, Niger, Chad, Cameroon
  [47,27],[48,27],[49,27],[50,27],[51,27],[52,27],[53,27],
  [47,28],[48,28],[49,28],[50,28],[51,28],[52,28],[53,28],
  [48,29],[49,29],[50,29],[51,29],[52,29],[53,29],
  
  // CENTRAL AFRICA
  // DRC, Central African Republic, Congo
  [49,30],[50,30],[51,30],[52,30],[53,30],[54,30],[55,30],
  [49,31],[50,31],[51,31],[52,31],[53,31],[54,31],[55,31],
  [50,32],[51,32],[52,32],[53,32],[54,32],[55,32],
  [50,33],[51,33],[52,33],[53,33],[54,33],
  
  // EAST AFRICA
  // Sudan, South Sudan, Ethiopia, Somalia
  [54,26],[55,26],[56,26],[57,26],[58,26],
  [54,27],[55,27],[56,27],[57,27],[58,27],[59,27],
  [54,28],[55,28],[56,28],[57,28],[58,28],[59,28],
  [55,29],[56,29],[57,29],[58,29],[59,29],
  // Kenya, Tanzania, Uganda
  [55,30],[56,30],[57,30],[58,30],
  [55,31],[56,31],[57,31],[58,31],
  [56,32],[57,32],[58,32],
  
  // SOUTHERN AFRICA
  // Angola, Zambia, Zimbabwe
  [47,32],[48,32],[49,32],[50,32],[51,32],[52,32],[53,32],[54,32],[55,32],
  [47,33],[48,33],[49,33],[50,33],[51,33],[52,33],[53,33],[54,33],[55,33],
  [48,34],[49,34],[50,34],[51,34],[52,34],[53,34],[54,34],[55,34],
  // Mozambique
  [56,33],[57,33],[56,34],[57,34],[56,35],[57,35],
  // Namibia, Botswana, South Africa
  [47,34],[48,34],[49,34],[50,34],[51,34],[52,34],[53,34],[54,34],
  [48,35],[49,35],[50,35],[51,35],[52,35],[53,35],[54,35],[55,35],
  [49,36],[50,36],[51,36],[52,36],[53,36],[54,36],[55,36],
  [50,37],[51,37],[52,37],[53,37],[54,37],
  [51,38],[52,38],[53,38],[54,38],
  
  // MADAGASCAR
  [59,33],[60,33],[59,34],[60,34],[61,34],[59,35],[60,35],[61,35],[60,36],[61,36],[60,37],[61,37],
  
  // ==================== MIDDLE EAST ====================
  // Turkey
  [56,18],[57,18],[58,18],[59,18],[60,18],[61,18],[62,18],
  [57,19],[58,19],[59,19],[60,19],[61,19],[62,19],
  // Syria, Iraq, Iran
  [58,20],[59,20],[60,20],[61,20],[62,20],[63,20],[64,20],[65,20],
  [58,21],[59,21],[60,21],[61,21],[62,21],[63,21],[64,21],[65,21],[66,21],
  [59,22],[60,22],[61,22],[62,22],[63,22],[64,22],[65,22],[66,22],
  // Saudi Arabia, Yemen, Oman, UAE
  [57,23],[58,23],[59,23],[60,23],[61,23],[62,23],[63,23],[64,23],
  [57,24],[58,24],[59,24],[60,24],[61,24],[62,24],[63,24],[64,24],
  [58,25],[59,25],[60,25],[61,25],[62,25],[63,25],
  [59,26],[60,26],[61,26],[62,26],
  [60,27],[61,27],
  
  // ==================== RUSSIA (spans Europe & Asia) ====================
  // Svalbard (Norwegian Arctic)
  [50,4],[51,4],[52,4],[50,5],[51,5],[52,5],
  // Franz Josef Land
  [60,3],[61,3],[62,3],[60,4],[61,4],[62,4],
  // Novaya Zemlya
  [58,4],[59,4],[58,5],[59,5],[58,6],[59,6],
  // Severnaya Zemlya
  [72,3],[73,3],[74,3],[72,4],[73,4],[74,4],
  // New Siberian Islands
  [80,4],[81,4],[82,4],[80,5],[81,5],[82,5],
  // Wrangel Island
  [92,5],[93,5],
  // Northern Russia
  [57,7],[58,7],[59,7],[60,7],[61,7],[62,7],[63,7],[64,7],[65,7],[66,7],[67,7],[68,7],[69,7],[70,7],[71,7],[72,7],[73,7],[74,7],[75,7],[76,7],[77,7],[78,7],[79,7],[80,7],[81,7],[82,7],[83,7],[84,7],[85,7],[86,7],[87,7],[88,7],[89,7],[90,7],[91,7],[92,7],
  [56,8],[57,8],[58,8],[59,8],[60,8],[61,8],[62,8],[63,8],[64,8],[65,8],[66,8],[67,8],[68,8],[69,8],[70,8],[71,8],[72,8],[73,8],[74,8],[75,8],[76,8],[77,8],[78,8],[79,8],[80,8],[81,8],[82,8],[83,8],[84,8],[85,8],[86,8],[87,8],[88,8],[89,8],[90,8],[91,8],[92,8],
  [56,9],[57,9],[58,9],[59,9],[60,9],[61,9],[62,9],[63,9],[64,9],[65,9],[66,9],[67,9],[68,9],[69,9],[70,9],[71,9],[72,9],[73,9],[74,9],[75,9],[76,9],[77,9],[78,9],[79,9],[80,9],[81,9],[82,9],[83,9],[84,9],[85,9],[86,9],[87,9],[88,9],[89,9],[90,9],[91,9],
  [57,10],[58,10],[59,10],[60,10],[61,10],[62,10],[63,10],[64,10],[65,10],[66,10],[67,10],[68,10],[69,10],[70,10],[71,10],[72,10],[73,10],[74,10],[75,10],[76,10],[77,10],[78,10],[79,10],[80,10],[81,10],[82,10],[83,10],[84,10],[85,10],[86,10],[87,10],[88,10],[89,10],[90,10],
  [57,11],[58,11],[59,11],[60,11],[61,11],[62,11],[63,11],[64,11],[65,11],[66,11],[67,11],[68,11],[69,11],[70,11],[71,11],[72,11],[73,11],[74,11],[75,11],[76,11],[77,11],[78,11],[79,11],[80,11],[81,11],[82,11],[83,11],[84,11],[85,11],[86,11],[87,11],[88,11],[89,11],
  [58,12],[59,12],[60,12],[61,12],[62,12],[63,12],[64,12],[65,12],[66,12],[67,12],[68,12],[69,12],[70,12],[71,12],[72,12],[73,12],[74,12],[75,12],[76,12],[77,12],[78,12],[79,12],[80,12],[81,12],[82,12],[83,12],[84,12],[85,12],[86,12],[87,12],[88,12],
  [59,13],[60,13],[61,13],[62,13],[63,13],[64,13],[65,13],[66,13],[67,13],[68,13],[69,13],[70,13],[71,13],[72,13],[73,13],[74,13],[75,13],[76,13],[77,13],[78,13],[79,13],[80,13],[81,13],[82,13],[83,13],[84,13],[85,13],[86,13],
  // Kamchatka Peninsula
  [92,9],[93,9],[92,10],[93,10],[92,11],[93,11],[93,12],
  
  // ==================== CENTRAL ASIA ====================
  // Kazakhstan
  [59,14],[60,14],[61,14],[62,14],[63,14],[64,14],[65,14],[66,14],[67,14],[68,14],[69,14],[70,14],
  [60,15],[61,15],[62,15],[63,15],[64,15],[65,15],[66,15],[67,15],[68,15],[69,15],
  [61,16],[62,16],[63,16],[64,16],[65,16],[66,16],[67,16],[68,16],
  // Uzbekistan, Turkmenistan, Tajikistan, Kyrgyzstan
  [61,17],[62,17],[63,17],[64,17],[65,17],[66,17],[67,17],
  [62,18],[63,18],[64,18],[65,18],[66,18],
  
  // Mongolia
  [71,14],[72,14],[73,14],[74,14],[75,14],[76,14],[77,14],[78,14],[79,14],[80,14],
  [72,15],[73,15],[74,15],[75,15],[76,15],[77,15],[78,15],[79,15],[80,15],
  [73,16],[74,16],[75,16],[76,16],[77,16],[78,16],[79,16],
  
  // ==================== CHINA ====================
  [70,17],[71,17],[72,17],[73,17],[74,17],[75,17],[76,17],[77,17],[78,17],[79,17],[80,17],[81,17],[82,17],[83,17],
  [68,18],[69,18],[70,18],[71,18],[72,18],[73,18],[74,18],[75,18],[76,18],[77,18],[78,18],[79,18],[80,18],[81,18],[82,18],[83,18],[84,18],
  [67,19],[68,19],[69,19],[70,19],[71,19],[72,19],[73,19],[74,19],[75,19],[76,19],[77,19],[78,19],[79,19],[80,19],[81,19],[82,19],[83,19],[84,19],
  [68,20],[69,20],[70,20],[71,20],[72,20],[73,20],[74,20],[75,20],[76,20],[77,20],[78,20],[79,20],[80,20],[81,20],[82,20],[83,20],
  [69,21],[70,21],[71,21],[72,21],[73,21],[74,21],[75,21],[76,21],[77,21],[78,21],[79,21],[80,21],[81,21],[82,21],
  [71,22],[72,22],[73,22],[74,22],[75,22],[76,22],[77,22],[78,22],[79,22],[80,22],[81,22],
  [73,23],[74,23],[75,23],[76,23],[77,23],[78,23],[79,23],[80,23],
  
  // ==================== INDIA & SOUTH ASIA ====================
  // Pakistan
  [63,22],[64,22],[65,22],[66,22],[67,22],
  [63,23],[64,23],[65,23],[66,23],[67,23],
  [64,24],[65,24],[66,24],[67,24],
  // India
  [67,23],[68,23],[69,23],[70,23],[71,23],[72,23],
  [66,24],[67,24],[68,24],[69,24],[70,24],[71,24],[72,24],[73,24],
  [66,25],[67,25],[68,25],[69,25],[70,25],[71,25],[72,25],[73,25],
  [67,26],[68,26],[69,26],[70,26],[71,26],[72,26],[73,26],
  [68,27],[69,27],[70,27],[71,27],[72,27],
  [69,28],[70,28],[71,28],[72,28],
  [70,29],[71,29],[72,29],
  [71,30],[72,30],
  // Sri Lanka
  [72,31],[73,31],[72,32],[73,32],
  // Nepal & Bhutan
  [72,23],[73,23],[74,23],[75,23],[76,23],
  // Bangladesh
  [74,25],[75,25],[74,26],[75,26],
  
  // ==================== SOUTHEAST ASIA ====================
  // Myanmar (Burma)
  [74,24],[75,24],[76,24],[74,25],[75,25],[76,25],[75,26],[76,26],[77,26],[76,27],[77,27],[76,28],[77,28],
  // Thailand
  [77,25],[78,25],[77,26],[78,26],[79,26],[77,27],[78,27],[79,27],[78,28],[79,28],[78,29],[79,29],
  // Vietnam
  [80,24],[81,24],[80,25],[81,25],[80,26],[81,26],[80,27],[81,27],[80,28],[81,28],[82,28],[81,29],[82,29],
  // Laos & Cambodia
  [79,25],[80,25],[79,26],[80,26],[79,27],[80,27],
  // Malaysia (peninsula)
  [78,30],[79,30],[80,30],[78,31],[79,31],[80,31],[79,32],
  
  // ==================== INDONESIA ====================
  // Sumatra
  [75,30],[76,30],[77,30],[75,31],[76,31],[77,31],[78,31],[76,32],[77,32],[78,32],[77,33],[78,33],
  // Java
  [79,33],[80,33],[81,33],[82,33],[83,33],[80,34],[81,34],[82,34],[83,34],[84,34],
  // Borneo (Kalimantan)
  [81,29],[82,29],[83,29],[84,29],[81,30],[82,30],[83,30],[84,30],[85,30],[82,31],[83,31],[84,31],[85,31],[83,32],[84,32],[85,32],
  // Sulawesi
  [86,30],[87,30],[86,31],[87,31],[88,31],[87,32],[88,32],
  // Lesser Sunda Islands (Bali, Lombok, etc.)
  [84,35],[85,35],[86,35],[87,35],
  // Maluku Islands
  [89,31],[90,31],[89,32],[90,32],
  // Papua (Indonesian half)
  [91,31],[92,31],[93,31],[91,32],[92,32],[93,32],[94,32],[92,33],[93,33],[94,33],
  
  // ==================== PHILIPPINES ====================
  [84,24],[85,24],[86,24],
  [84,25],[85,25],[86,25],[87,25],
  [84,26],[85,26],[86,26],[87,26],
  [85,27],[86,27],[87,27],
  [85,28],[86,28],[87,28],
  [86,29],[87,29],
  
  // ==================== JAPAN ====================
  // Hokkaido
  [89,14],[90,14],[91,14],[89,15],[90,15],[91,15],
  // Honshu (main island)
  [87,16],[88,16],[89,16],[90,16],[87,17],[88,17],[89,17],[90,17],[88,18],[89,18],[90,18],[89,19],[90,19],
  // Shikoku
  [88,19],
  // Kyushu
  [87,19],[88,20],[89,20],
  
  // ==================== KOREA ====================
  // North Korea
  [84,17],[85,17],[86,17],[84,18],[85,18],[86,18],
  // South Korea
  [85,19],[86,19],[87,19],[85,20],[86,20],
  
  // ==================== TAIWAN ====================
  [85,23],[86,23],[85,24],[86,24],
  
  // ==================== AUSTRALIA ====================
  // Northern Territory & Queensland
  [82,35],[83,35],[84,35],[85,35],[86,35],[87,35],[88,35],[89,35],[90,35],[91,35],[92,35],
  [81,36],[82,36],[83,36],[84,36],[85,36],[86,36],[87,36],[88,36],[89,36],[90,36],[91,36],[92,36],[93,36],
  [80,37],[81,37],[82,37],[83,37],[84,37],[85,37],[86,37],[87,37],[88,37],[89,37],[90,37],[91,37],[92,37],[93,37],
  // Western Australia
  [79,38],[80,38],[81,38],[82,38],[83,38],[84,38],[85,38],[86,38],[87,38],[88,38],[89,38],[90,38],[91,38],[92,38],[93,38],
  [79,39],[80,39],[81,39],[82,39],[83,39],[84,39],[85,39],[86,39],[87,39],[88,39],[89,39],[90,39],[91,39],[92,39],[93,39],
  // South Australia & NSW & Victoria
  [80,40],[81,40],[82,40],[83,40],[84,40],[85,40],[86,40],[87,40],[88,40],[89,40],[90,40],[91,40],[92,40],[93,40],
  [81,41],[82,41],[83,41],[84,41],[85,41],[86,41],[87,41],[88,41],[89,41],[90,41],[91,41],[92,41],
  [82,42],[83,42],[84,42],[85,42],[86,42],[87,42],[88,42],[89,42],[90,42],[91,42],[92,42],
  [84,43],[85,43],[86,43],[87,43],[88,43],[89,43],[90,43],[91,43],
  // Tasmania
  [89,44],[90,44],[91,44],[89,45],[90,45],[91,45],
  
  // ==================== PAPUA NEW GUINEA ====================
  [92,33],[93,33],[94,33],[95,33],[96,33],
  [92,34],[93,34],[94,34],[95,34],[96,34],
  [93,35],[94,35],[95,35],
  
  // ==================== NEW ZEALAND ====================
  // North Island
  [96,41],[97,41],[96,42],[97,42],[98,42],[97,43],[98,43],
  // South Island
  [96,44],[97,44],[96,45],[97,45],[98,45],[96,46],[97,46],[98,46],[97,47],[98,47],
];

export default function GlobalMap() {
  const [hoveredLocation, setHoveredLocation] = useState<EventLocation | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<EventLocation | null>(null)

  // Memoize the dots to prevent recalculation
  const mapDots = useMemo(() => worldMapDots, [])

  return (
    <section id="overview" className="min-h-screen bg-black relative flex items-center justify-center py-20 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BFF000]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#BFF000]/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
          >
            Global Presence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#BFF000]"
          >
            From Web3 conferences to blockchain summits, delivering premium merch across continents since 2021
          </motion.p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative w-full aspect-[2/1] bg-[#050505] rounded-2xl p-4 md:p-8 overflow-hidden border border-white/5">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#BFF000]/5 via-transparent to-transparent opacity-50" />
            
            <svg viewBox="0 0 100 50" className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Dotted World Map */}
              <g>
                {mapDots.map(([x, y], index) => (
                  <circle
                    key={`dot-${x}-${y}`}
                    cx={x}
                    cy={y}
                    r="0.4"
                    fill="#BFF000"
                    opacity="0.7"
                  />
                ))}
              </g>

              {/* Event Location Markers */}
              {eventLocations.map((location, index) => (
                <g key={`marker-${index}`}>
                  {/* Outer pulse ring */}
                  <motion.circle
                    cx={location.coordinates.x}
                    cy={location.coordinates.y}
                    r="2.5"
                    fill="none"
                    stroke="#BFF000"
                    strokeWidth="0.15"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Middle pulse */}
                  <motion.circle
                    cx={location.coordinates.x}
                    cy={location.coordinates.y}
                    r="1.5"
                    fill="#BFF000"
                    opacity="0.2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.15,
                    }}
                  />

                  {/* Main marker dot */}
                  <motion.circle
                    cx={location.coordinates.x}
                    cy={location.coordinates.y}
                    r="0.8"
                    fill="#BFF000"
                    filter="url(#markerGlow)"
                    className="cursor-pointer"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.1, type: "spring", bounce: 0.5 }}
                    whileHover={{ scale: 1.8 }}
                    onMouseEnter={() => setHoveredLocation(location)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    onClick={() => setSelectedLocation(location)}
                  />

                  {/* Center bright dot */}
                  <motion.circle
                    cx={location.coordinates.x}
                    cy={location.coordinates.y}
                    r="0.3"
                    fill="#fff"
                    className="cursor-pointer pointer-events-none"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                  />
                </g>
              ))}
            </svg>

            {/* Tooltip */}
            {hoveredLocation && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute top-4 right-4 bg-black/95 backdrop-blur-xl border border-[#BFF000]/40 rounded-xl p-4 max-w-xs z-20 shadow-2xl shadow-[#BFF000]/10"
              >
                <div className="flex items-start justify-between mb-2 gap-4">
                  <h3 className="text-lg font-bold text-[#BFF000]">{hoveredLocation.name}</h3>
                </div>
                <p className="text-sm text-white/90 mb-1">{hoveredLocation.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">{hoveredLocation.country}</span>
                </div>
              </motion.div>
            )}

            {/* Continent Labels */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              <span className="absolute left-[15%] top-[28%] text-[9px] text-white/15 font-medium tracking-wider">NORTH AMERICA</span>
              <span className="absolute left-[22%] top-[68%] text-[9px] text-white/15 font-medium tracking-wider">SOUTH AMERICA</span>
              <span className="absolute left-[46%] top-[24%] text-[9px] text-white/15 font-medium tracking-wider">EUROPE</span>
              <span className="absolute left-[47%] top-[52%] text-[9px] text-white/15 font-medium tracking-wider">AFRICA</span>
              <span className="absolute left-[72%] top-[28%] text-[9px] text-white/15 font-medium tracking-wider">ASIA</span>
              <span className="absolute left-[82%] top-[72%] text-[9px] text-white/15 font-medium tracking-wider">AUSTRALIA</span>
            </div>
          </div>

          {/* Event Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            {eventLocations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.04 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center cursor-pointer border transition-all duration-300 ${
                  selectedLocation?.name === location.name
                    ? "border-[#BFF000]/60 shadow-lg shadow-[#BFF000]/10"
                    : "border-white/10 hover:border-[#BFF000]/30"
                }`}
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => setSelectedLocation(location)}
              >
                <div className="w-2 h-2 bg-[#BFF000] rounded-full mx-auto mb-2 shadow-lg shadow-[#BFF000]/50" />
                <h4 className="text-xs font-semibold text-white mb-0.5 leading-tight">{location.name}</h4>
                <p className="text-[10px] text-gray-500">{location.country}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: "Event Countries", value: "20+" },
              { label: "Global Events", value: "25+" },
              { label: "Clients", value: "150+" },
              { label: "Products", value: "30k+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1, type: "spring", bounce: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-[#BFF000] mb-1"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
