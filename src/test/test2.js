import { supabase } from "../../supabaseClient.js";
import {
  correctTranscriptErrors,
  getEntitiesNer,
  makeLlmPrompt,
} from "../Llm.js";
import { LLMFactory } from "../llm/factory.js";
import { formatTimestamp, validateTimestamps } from "../utils.js";
import Fuse from "fuse.js";

// async function fetchKnowledge() {
//   const { data, error } = await supabase
//     .from("knowledge")
//     .select("*")
//     .eq("hasUpdatedTranscript", false);

//   if (error) {
//     console.error("Error fetching knowledge:", error);
//     return [];
//   }
//   return data;
// }

// async function updateKnowledge({ analysis, summary, link, usage }) {
//   analysis = JSON.parse(analysis);
//   summary = JSON.parse(summary);

//   const llm_answer = {
//     projects:
//       Array.isArray(analysis) && analysis[0]?.projects
//         ? analysis[0].projects.map((project) => ({
//             coin_or_project: project.coin_or_project,
//             marketcap: (
//               project.Marketcap ||
//               project.marketcap ||
//               ""
//             ).toLowerCase(),
//             rpoints: Number(project.Rpoints || project.rpoints || 0),
//             total_count: Number(
//               project["Total count"] || project.total_count || 0
//             ),
//             category: Array.isArray(project.category) ? project.category : [],
//           }))
//         : [],
//     total_count: Number(analysis[0]?.total_count || 0),
//     total_rpoints: Number(
//       analysis[0]?.total_Rpoints || analysis[0]?.total_rpoints || 0
//     ),
//   };
//   const { data, error } = await supabase
//     .from("knowledge")
//     .update({
//       hasUpdatedTranscript: true,
//       usage: usage,
//       llm_answer: llm_answer,
//       summary: summary,
//     })
//     .eq("link", link);

//   if (error) {
//     console.error("Error updating knowledge:", error);
//     return null;
//   }
//   return data;
// }

// export const makeAnalysisBat = async () => {
//   const data = await fetchKnowledge();
//   console.log(`Starting Analysis for ${data.length} items`);

//   for (const item of data) {
//     console.log(`Processing item with link: ${item.link}`);

//     try {
//       const { analysis, summary, usage } = await makeLlmPrompt({
//         model: "grok",
//         transcript: item.corrected_transcript,
//       });
//       await updateKnowledge({
//         link: item.link,
//         analysis: JSON.stringify(analysis),
//         summary: JSON.stringify(summary),
//         usage: usage,
//       });
//       console.log(`Successfully processed item: ${item.link}`);
//     } catch (error) {
//       console.error(`Error processing item ${item.link}:`, error);
//     }
//   }

//   console.log("Analysis completed for all items");
// };

// const analysisMessages = [
//   {
//     role: "system",
//     content: "You are an intelligent assistant",
//   },
//   {
//     role: "user",
//     content: "Is destra a crypto coin? Or is it wrongly written?",
//   },
// ];
// const grok = LLMFactory.createProvider("grok");
// const results = await grok.makeRequest(analysisMessages);
// const content = await grok.processResponse(results);
// console.log("Results: " + content.content);

// const { transcript, usage, default_content, entities, error } =
//   await correctTranscriptErrors({
//     transcript: `it's time for my most important video of the year or potentially my most important video for the next four years
// and that's because today I'm going to be giving you a complete overview of my portfolio for 2024 I'm going to be
// explaining to you why I'm buying what I'm buying the odds that I see of this bet working out and of course my plan to
// eventually sell these assets for what I hope will be a life-changing amount of money but it's time to get real here and
// talk about the brass tax I'm going to be going into the hot narratives gaming AI layer ones and helping you pull apart
// and understand exactly why I believe these projects are going to win now in December of 2020 I did a similar video
// and I called out axi Infiniti on December 7th 2020 the price of axi
// Infiniti was about 55 and it went on to Peak here at
// $160 that my friends is not a 100x that is a 300X now beyond that you you know that
// I've called some of the absolute biggest most face melting gainers of 2023 a year
// in which most people told us that Bitcoin and all of crypto was going to zero Bitcoin will go to zero and we
// proved them wrong in fact I do believe that this channel has nailed it more so than almost any other in the entire
// crypto space but it's time to get real all of this crypto stuff is a massive risk that's why there's the potential
// upside for literally life-changing gains in the short amount of time when you compare it to any other industry that
// also means you got to be prepared for that downside even the best projects in this space could crash 70 80 90% in fact
// some of these projects are so degenerate that you must seek medical help if you want to actually buy them literally the
// only way you'll be able to view yourself if you lose money here is with clown makeup and a wig so if we're going to do
// this crypto thing you got to put on your big boy pants you got to take responsibility for each and every coin
// you buy and most important importantly you have to have a plan why are you buying it what do you believe the valuation for this asset could be and
// when at what price points will you sell this thing because if you can't answer those questions you are forever going to
// be fish food to the sharks swimming around you in the crypto waterers now let's talk about the first thing which
// is why right now is actually really good timing now Bitcoin does this thing where it goes on a four-year cycle it has
// three good years and then one terrible year the problem is that most people get in when Bitcoin is at the Apex of that
// one candle they get in at the top when everybody's screaming about crypto how they made all this money Dogecoin
// Millionaires and so on and so forth the higher Bitcoin and crypto goes in price the more dangerous it is that it could
// drop in price of course if you flip that around the lower it goes the safer it is to buy and the more likely you are to
// get the good price close to the bottom and that's why we were buying as soon as we saw some good indications out of the
// FED when they stepped in and started saving banks in March that's when we hopped in here and said hey look I think
// think that these bailouts are going to create more liquidity and form a bottom I think the bleed is over and it's time
// to start allocating even though it feels uncomfortable and it will feel uncomfortable even in these bull runs
// there are crazy dips as my buddy Alex Becker would say my co-founder in neotokyo this is a chart you're going to
// see everywhere where you see the massive sell-offs that happened all the way up during the 2017 rally the fact is that
// bull runs are actually the time to buy the dip bare markets are where you sell the rally if you think about it the
// overall trend is up so you want to buy as it comes down cuz you know it's going to go back up or at least you have a
// good idea that the trend will continue remember the trend is your friend and the same is true of the bare Market
// while things are macro going down you want to sell them as they rally up cuz that's your chance to get out at a good
// price now I wanted to add in here that Bitcoin is now in a dip and the whole Market has pretty much taken a massive
// dip well not every coin of course beam and immutable X are still crushing it but you you know most of the coins here
// have taken a bit of a dip there's plenty of coins in the red here over the last few days and honestly it's kind of
// popping up right now so you know it's at 42,000 if it gets back above this you know $43,000 Mark or so you know if it
// gets back Above This 425 or specifically above 43 44 this dip is over right this
// is going to to new highs for the year what I want to impress upon you is this dips are effectively the thing that you
// want you don't want to just be chasing when things are up up and away that might feel like the best time to invest
// it certainly is the most exciting but what you really want to wait for are the times that it's not exciting again so if
// this dip gets worse goes down into the 30s or so maybe even the low3s that would not be the end of times now it
// would be very concerning if we go below you know 31,000 or 32,000 that is a very
// sensitive area and might signal a much more difficult time for Bitcoin ahead
// really all of crypto but in the case of right now anything above 32,000 to me is
// a massive massive opportunity if it comes down and the more uncomfortable it gets the more the Bears come out of
// their caves and start screaming it was all a dream this was the biggest bull trap in the history of the world well
// that to me my friends is the time that all be looking to smash the buy button but again I'm not doing too much right
// now I've been buying throughout 2023 and so I'm pretty well positioned here coming into 2024 but I hope this video
// helps you out a lot and back to the analysis so the point is right now we are still in this three candle which is
// right before the two most parabolic years the two best years of the Bitcoin cycle that is if the cycle is to
// continue to play out the way it worked before now a lot of people don't believe in this cycle stuff but get this you
// want to see something crazy from the all-time low in 2015 to the all-time high in 2017 it was exactly
// 1,64 days from the all-time high in 2017 to the all-time low in 2018 it was
// exactly 364 days from all-time low in 2018 to alltime high in 2021 1, 64 days
// again exactly the time from low to high and then once again from all-time high
// in November of 2021 to alltime low in November of 2022
// 364 days honestly some things are Stranger Than Fiction and Bitcoin very
// well might be one of those maybe we're all in a simulation maybe this is all some collective delusion maybe there are
// no coins at all what I do know is that as long as this Bitcoin cycle continues to show itself and prove itself out as
// it has once again in 2023 I feel like I would be a damn fool not to bet hard on
// the industry that I log into and talk about and obsess over every single day so that's what I'm doing but make no
// mistake this is risky business and everything you buy into could be manipulated crash the founders could end
// up not being honorable or doing the right thing the code could get hacked stuff is very very risky and you assume
// a 70 to 100% loss whenever you buy anything in this crypto space the
// trade-off here is you're trading a 70% downside for a potential thousand or
// 10,000% upside that's 10 to 100x upside versus a near total loss those are
// better odds than you're going to get in Vegas almost any day of the week and for that reason I'm all in on crypto gambling to make my life better and if
// you're here in crypto right now watching a video like this you need to slam down some hard to swallow pills and
// understand that you're gambling too well to be fair we all need to gamble that's what the Fiat system forces us to do cuz
// your money turns to dust in your wallet your labor is not worth anything anymore we need to gamble in stocks in real
// estate in assets of some kind if you want to get ahead and to me crypto is the one that I know and it's the one
// that I think is the most generous and most likely to help people Achieve Financial Freedom so I'm gambling here
// and with that said let's get to my portfolio for 2024 of course we should add that Michael sailor the biggest bull
// on Wall Street believes Bitcoin will hit a $350,000 price in 2024 now that would
// mean that Bitcoin is about 10x from here of course what we saw over the last one
// was Bitcoin went about 3x over its prior all-time high now if Bitcoin goes to 350k that would mean it would do a 5x
// over its prior all-time high whereas last cycle it did about a 3 and 1/2x over its prior alltime high so it's
// going way higher and that would mean that what we'd see out of total three meaning the altcoins would probably be
// even more dramatic right we saw a gain here of total three which went from about 300 billion up to 1.3 trillion
// this was about a 212% gain or almost a 3X out of the altcoins now if we go 50%
// more that means we could see about a 4X out of the altcoins from prior all-time high and that would mean altcoins alone
// would be at $4.5 trillion doll not to mention you add in Bitcoin and eth you have crypto scratching its head on
// nearly $1 trillion in market value that my friends is the size of gold and that
// my friends is a whole new ball game as they would say and as always I solicited the community I said I'm doing my 2024
// portfolio video this week what coins should I include and I literally in a few hours got almost 1,000 responses and
// they were really bad they were terrible I am not taking advice from you guys ever again I don't know what you're trying to do to me but please God stop
// trying to give me Alpha because it is not working anyway back to the show all right let's get into it this is going to
// be a complete breakdown of the 2024 portfolio and I'm not going to give you exact percentage size of these tokens
// but I'm going to give you a general idea on how I'm organizing my portfolio as a whole and then I'm going to give you the
// actual products within each category and this is going to be an absolutely monstrous amount of information so get
// ready smash that like button and make sure you're subscribed with the Bell notification on each video we've come
// out with over the past few weeks I've been trying to make sure that they are so loaded with information that they are
// effectively unmissable okay the first one where we started doing this was 185k
// views we're going to have our first video Hit 200k K views in what feels like years I'm sure it has been and
// every single video here I've been pouring my heart and soul into making sure that they are jam-packed with Alpa
// so make sure you put the Bell notification on because everything I put out on this channel going forward will
// be in my opinion required viewing you absolutely must watch this stuff if you
// want to be ahead of crypto no channel is covering these niches and these movements like I am and I'm giving this
// all to you for free and I'm trying to make sure that I don't waste any of your time here so hit that Bell notification
// and you will be in my opinion way ahead of everyone else but again as I go through these coins I want to be very
// clear I will explain my logic as to why I like these coins but in the end this
// community is getting so big and so many people know about the strength of this community that inevitably if you're
// following the coins here only on this list then you're always going to be late I want you to take the ideas here the
// mental models of how I'm finding and analyzing coins in this market which I explained in detail and I want you to
// apply them on your own and that way you can be ahead instead of buying a YouTuber coin like I'm going to be
// covering here it's going to allow you to get ahead of everyone else but only if you do these things and do the hard work
// on your own with that said I hope this information helps you now starting at the top we have salana okay this is a
// risk ranking and by the way you see my technicolored risk ranking chart here again this is completely made up right
// I'm just trying to give you a sense here of where the the bigger risks are uh blue chips and the medium and the medium
// highs those are just going to be lower gains there's still a ton of risk in those coins right everything has risk in
// this industry could get sued by the government founder could die you never know crazy world lot of smells Anything
// Could Happen okay but anyway enough of that salana you guys know my thesis here salana is the best competitor to ethereum and everything in the salana
// ecosystem Has Gone Bananas I started giving you guys salana in the teens in the low 20s and it has absolutely
// crushed it it peaked I think at about $75 um I'm just calling my ET call here 17 though I know I talked about it
// around the 13 range I just think I was more forceful around the $17 range and so the gains so far are 321 per or 4.21
// x's and the downside and this is how I'm calculating this the downside is the
// 2023 low so the low value in 2023 I don't think the market goes and revisits
// those I think that's a hard bottom and so my logic is your downside in this category is effectively the current
// value and that is divided by the or the the 2023 low divided by the current
// value and that allows you to see effectively how low you could go if we revisit those lows which is possible
// right if there's some apocalyptic scenario and Bitcoin just shreds through 32k and everything turns out to be a
// massive bull trap and kappo was right well I guess this is possible right we could go revisit those 2023 lows so I'm
// just showing you your max downside but just know essentially salana has taken on this super Blue Chip status as a
// testament to that projects like gito which are essentially like Lio or Flash Bots in the salana ecosystem are being
// valued at multi-billion dollars that's $3 billion fdv for a project like jeto
// which arguably might be seen as too much too soon but it just shows you how significant the salana ecosystem is that
// people are valuing uh the coins in the salana ecosystem as equal to their ethereum counterparts and that's a
// massive narrative so like I said I'll be rotating profits from trades into salana as part of my strategy and that is one
// that I keep getting laughed at in the YouTube comments so if you want to keep laughing at me go ahead I appreciate it
// every time I've been laughed at and mocked for my choices that I'm making publicly here for you all it's turned
// out to be a massive Money Maker so reply guys eat your heart out because you are my best indicator that I'm doing
// something right I know it's a hard pill to swallow but we have a lot of coins to get through so we are going to start getting through them the second one is
// chain link again chain link is one of the most important protocols in the entire space they're integrating with
// swift that's right the banking Swift they are one of the most legitimate ways to communicate between chains and
// protocols if you have dexes that are feeding in prices well they're using an Oracle and that is coming in through
// chain link chain link is effectively part of most if not all of Defi and it
// is a blue chip by all standards again Blue Chips they have a potential for maybe a 10x or so from here maybe a 15x
// in a very good situation but they're also lower risk they're not going to dump as fast they have much more
// significant holder bases and chain link is definitely a blue Blue Chip to have on your radar it's part of my portfolio
// and if you want a more passive portfolio things like salana and chain link are definitely in that lower crypto risk
// almost guaranteed to be here for the next several years if not on into the future next we have coinbase as you know
// I'm a big bull on coinbase stock after the fall of CZ and FTX they are the last
// man standing and they are the white knight of crypto publicly listed on the stock market I've been aping coinbase
// like a madman since about $60 here $65 is when I covered it on the channel and
// that would mean that we're about 2.1x over my call and I keep adding to my coinbase position just cuz it's really
// easy to do for my bank I have sort of my Fiat and crypto worlds separated and it's a really nice easy thing to do that
// I've been rotating out of my treasury bills and into coinbase stock largely from my treasury bills and it's been an
// insane play I also think coinbase is a blue chip in that it's not going to do more than a 10x here in fact if it hits
// $1,000 I would be kind of mind blown I think that that's possible in like a total blowoff top but really I'm just
// hoping it makes new highs around $500 to $1,000 at the end of the cycle in 20125
// that would be a blessing and I think that that is a peak price for coinbase this is the only stock you're going to
// see here but it trades like a crypto so of course if you want something more passive these are things you can just buy and know they're going to be here
// years from now and probably going to grow with the cycle now we get into something a little more spicy which is Avalanche as you guys know I've been a
// big Avalanche bull throughout the years I was first on avax in 2021 one I was
// one of the first YouTubers to bring avax and the avax ecosystem coins like Joe and some other Crazy Ones to the frame
// here Joe's like the Unis swap of avalanche again Avalanche is to me the next in line after salana as far as
// hyped layer one ecosystems and it is slightly off of Blue Chip it's not a blue chip it's a medium risk and just to
// show you here it's been tracking actually the gains of salana really really well if you look here soul is
// about 73% off its high Avalanche through most of the markets about 74% off its
// alltime high it was almost identical in its percent draw down from alltime high for the entirety of the bare market and
// so these two will probably make their way up to alltime high in a similar fashion and if you really study the
// actual movements Avalanche is a really interesting evm Tech again the layer one ecosystem has a ton of competition there
// are so many chains now but I just think there's some muscle memory in the charts here because Solana Luna and avax were
// like the trio of 2021 obviously Luna nuked and doesn't really exist anymore but salana and avac when salana makes a
// really big run avac seems to want to play catchup and look what is a medium risk goated L1 if you don't have polygon
// now polygon markets itself as a layer two but it really kind of in practice is a layer one though they are starting to
// connect the dots here with their cdk right so they have this chain development kit where they effectively
// allow people to launch their own ZK EVMS now this is very next gen and it's in fact the technology that underpins the
// newest initiative from immutable X which is of course also on this list and a project that we'll talk about shortly
// but together this is part of the three-headed dragon of gaming and polygon is beyond that it's also really
// good Tech and I know this from my developer friends which throughout 2021 really didn't like the technology that
// underpinned polygon they've made big strides and in my opinion their ZK Tech has started to become best-in-class and
// really next gen so it's something to consider that polygon and their technology keeps evolving and they're
// about to evolve from the madic token to the pole token again showing their firm transition to
// ZK rollup technology this is something to keep your eyes on and I have no reason to believe that polygon won't
// have a massive run in 2024 with the rest of the market again this thing went on 300X it was trading between 1 and 5
// cents when I was covering it like crazy in 2019 and 2020 and in 2021 it went on
// its hallowed run up to $3 it's pretty insane next one up is injective and in
// this case you want to trust the strength of the chart look at this this is one of the best performing assets of the entire
// market and one of the few that has actually broken its prior all-time high you can see its prior alltime high was
// about 24 bucks here and today it is sitting at $26 this is the way that you
// understand that strength begets strength and obviously we've talked about injective in fact we were one of the
// first people to cover injective at the beginning of the 2021 run at the end of 2020 we covered injective at 70 I
// actually participated in the early token sale and was able to get tokens at 70
// here and we rode this thing up as a community up to $22 absolutely astronomical but look it takes a very
// special type of team to be one of the first to overcome your prior highs in the new cycle and this chart is screaming that it wants to remain strong
// so again injective is a defi protocol is part of the cosmos ecosystem and you'd be a fool to fade this kind of strength
// in a new cycle next we have Celestia now Celestia is like a nerds Paradise again
// in the cosmos ecosystem both of these are they are their own layer ones and again I put them as medium high because
// they are newer Kids on the Block they are not as established as Avalanche they are not as established as polygon they do not have as many fundamentals driving
// them in fact Celestia's brand new and trading like an absolute beast but at the same time I think Celestia's Tech is
// very exciting to people and the strength of its chart simply cannot be denied I mean essentially it doesn't really know
// how to take a dip it's absolutely crazy obviously we talked about it here at about four bucks I had people talking to
// me about it at $2 but I missed that move and as you you can see the strength is just undeniable even when Bitcoin had
// this dip it just exploded upwards it shows you that there's true demand here for Celestia some additional Alpha here
// is that I'm hearing that there's going to be a ton of Celestia airdrops so if you're staking Celestia you'll get a ton
// of these projects that are launching on Celestia essentially giving you free tokens air drops so if you're staking the Tia coin then you could be eligible
// for some aird drops again this is all early Alpha but in addition they have a 16% APR so you stake you get some
// Celestial rewards and then you get some free tokens on top of it if this thing moons like crazy it could be one of the
// gigabrain plays of the cycle I'm certainly hoping it is now the last one is internet computer and what's crazy
// about this chart is I don't think I've seen a worst looking chart in my whole life like it is easily the worst looking
// chart of all charts however that is actually kind of a benefit when you zoom in you realize that almost all their
// tokens are in market right they have a total supply of 510 they have 450 circulating that's like I don't know 80
// or 90% there and so there's not a lot of inflation and this thing went through this crazy crazy dump where effectively
// everyone got mad and sold and its reputation went down but meanwhile they kept developing stuff and it's got this
// decentralized storage play that I actually think makes it slightly different than other layer ones it's not
// directly competing with the likes of soul and stuff who knows anyway I have some internet computer in my portfolio
// cuz I think there's a chance and if you see here it hasn't pumped very much its low was like three bucks it's up at like 5.6 it's not even 2x off its lows and
// get this the all time high was $700 right it's sitting here at $5
// that's literally more than 100x it's n it's over 99% down from its all-time high so if it does go back and tickle
// its all-time high which I think of as absolutely absurd it probably won't do that well it's just like there's just a
// lot of room for this thing to go that these are the charts that if they get going could mean business if they get
// serious again I have a very small amount of my portfolio but I figured it was worth a bet in case this thing does wake
// up next there's a project called monad it is not released yet it's in my uh unreleased and I just gave it a risk
// because I don't really know what the risk is cuz I don't know what the price is risk is heavily correlated to price
// if you don't know what the price is you can't determine the risk but anyway this is an upand cominging project that a lot
// of people are hyped about and I would not be shocked if this thing ends up catching some serious hype waves if we
// do get this bull run that we're all really hoping for this is one to have on your list definitely go ahead and follow
// it the next is layer zero again this is going to be one of the biggest coins in the the whole ecosystem and you can
// actually likely qualify for their airdrop if you're using their Stargate Finance defi application which allows
// you to bridge assets between different chains I highly encourage you to understand what layer zero is as this is
// likely to be one of the biggest token launches in the whole industry coming up soon shout out to the layer zero team because I've actually been collaborating
// with them on some other stuff again stuff that will be announced in 2024 now I want to be clear those are like the
// big coins those are the big pieces of tech out here that I want you to be aware of and most of those are lowerer
// risk and we'll have most likely pretty muted rewards we're not talking about 100 X's here like if Celestia goes 100x
// it would be worth like a quad zillion dollars that's not going to happen those are maybe 10 to 20x plays at the max but
// probably some of them will be closer to 5x plays in my opinion having too much of your crypto portfolio tied up in 5x
// plays feels like a waste that's my particular approach and to explain this in a little more depth I'm breaking out
// my portfolio breakdown which is in the end I have a lot of money in Treasures which I'm actually rotating quite a bit
// of money out of there because I believe interest rates have peaked and that risk is going to be the new thing to allocate
// towards that's my particular approach but in the end I have what's called a crypto barbell where on one side of the barbell I have lower risk stuff stuff I
// know is going to be there for a very long time stuff like Bitcoin stuff like coinbase stock stuff that I don't need
// to wake up in the middle of the night sweating and think has it all gone to zero has it all just evaporated into
// dust yeah yes this is the high conviction long-term bucket and in that high conviction long-term bucket we have
// Bitcoin we have ethereum we have salana and we have coinbase stock and that bucket actually has been updated because
// coinbase has been ripping salana has been absolutely ripping and this is how my long-term conviction bucket looks now
// I'm actually rotating profits whenever I do take them into salana that's my personal approach again I might rotate
// profits into some other exotic L1 if I get really carried away but this is my general plan I'm going to try to stick
// to my plan as much as I can it's also really important to make plans and write them down because the emotion of the market will carry you off into La La
// Land if you let it and if you write stuff down you can at least sober up for a second and pull yourself out of the
// Psychedelic Bull Run acid trip that has long since left planet Earth and you're
// contemplating whether a dogcoin on butthole chain can be worth $10 trillion because you saw a tick tocker made a Tik
// Tock about it and you're just wondering what the point of life is because you haven't talked to your friends in months
// and you stare at a screen all day trading crypto coins that's what the bull Run's like all right you lose your godamn marbles so keep it together all
// right keep it together and write stuff down all right a little break from the video here because if you're new to crypto you need to have a VPN and that's
// why I'm extremely proud to partner with nordvpn and be one of their leading Partners in the whole crypto space
// because if you don't have a VPN you're literally like a lamb to the slaughter here your IP address will start showing
// up on crypto sites which even though the blockchain is secure those sites could be compromised and your IP address
// effectively you could become a Target so you want to make sure that you avoid that situation with a product that only
// cost $3 per month but what's great is you get a massive discount if you use my link below again I was hacked a few
// months ago and so I take cyber security extremely seriously like I've said many
// times before you can be forgiven for a lot of mistakes in crypto a lot of them are understandable in fact even ogs make
// mistakes but one thing you will not be forgiven for is not having a VP VN it's so cheap it's so easy and best of all it
// supports the channel and I appreciate you guys so check out nordvpn sponsor of today's video and let's get back to some
// good old fashion cryptocoins back to the point here I personally think that the zero Infinity bucket is worth allocating
// to now I personally think the zero Infinity bucket has odds that in a bull run make sense because in a bull run if
// Bitcoin continues to grow usually altcoins will continue to grow especially early on in the bull run and
// quite Frank Al the risk if Bitcoin doesn't continue to grow is it could drop dramatically I mean bitcoin's up 3x
// on the year so I mean the thing could drop like 70% and still only be touching
// its 2023 low that my friends is a huge amount of downside but if you're upside
// is you know somewhat limited compared to the 100x opportunities out there and those 100x opportunities are likely to
// hold and grow if Bitcoin holds and grows then to me the crazy Bull Run logic is
// you want to be allocated in some way to these altcoins the zero Infinity bucket knowing that it goes to zero or the damn
// Moon and you're comfortable with the odds of it doing one or the other and you're ready for either outcome that's
// where I'm at again make your own decisions I have enough fiat currency I have enough cash in my world that if my
// crypto goes to zero I'll keep eating I'll keep surviving and my life won't be changed obviously it would suck ass but
// I would still continue to live and survive and pay rent a lot of people aren't in that same boat so you have to
// make the decisions based on your own Financial decisions I'm not going to be there to pay your rent or to feed your
// kids if you can't do it you got to take care of your own period okay so let's get to the fun stuff okay beam
// Merit Circle again they were called Merit Circle I covered them at about 40 cents and they've shot up here to what
// was the equivalent of $2 but when they did a 1 to 100 split on beam now the price is reflected you can think of this
// as 0.0043 or something like that so they've done about a 4.4x since I covered them absolutely smoking those
// gains and they are one of the most important coins in the crypto gaming space they have a ton of Investments
// they have a treasury of nearly $100 million they are actively invested in some of the best games in the space and
// they are now partnered with immutable X to bring some cool technology to the immutable X ZK evm speaking of immutable
// X they are also on this list as you know I an immutable X seed investor I'm a massive investor in beam and I have huge
// huge bags of both of these tokens and I am so happy to see them climbing the ranks with absolutely Reckless abandon
// here and I have no reason to doubt that they will continue to grow as gaming continues to grow my hope is that
// immutable X becomes the first gaming token to crack the top 10 in crypto market caps and just for some
// perspective here it's at $2.6 billion market cap the top 10 is 13 here so it
// would have to five or 6 x from here to overcome the Doge and to me that would
// have to do that you know against the market so this would take take a massive gaming run but I don't think it's insane
// I think it might happen here and if it does happen then that might mean that beam becomes a top 25 coin or something
// like that again understanding that crypto is about categories niches storylines and if one coin from a
// category makes it astronomically High the entire category will reprice under it so the higher immutable goes that
// creates a higher ceiling for the rest of the gaming ecosystem to flourish in so as a massive gaming bull I'm very
// excited that immutable X is continuing to crush on the way up and that to me paves the way it blazes a trail for all
// of gaming to repic under it so as you see a mutable X make this massive run know that it's bullish for all of gaming
// that's the facts Gala as we've said they are a publisher they have several games and they had a massive destructive run
// down from their all-time high their all-time high was like 70 cents they're currently at three here so on their way
// back up if they are to make it back up could do astronomical gains again their downside is about 60% % they haven't
// pumped too hard here as you can see these other ones have pumped much harder they're up much more significantly but
// about 2.1x since we called it here on the channel Ronin again similar to Gala
// they have some games far less games here like immutable has like hundreds of games that are coming to the immutable
// xchain but Ronin has axi Infinity which was the most successful crypto game of all time and they also have now pixels
// online which has 400,000 active users now the thing about the Ronin ecosystem is it caters largely they have a huge
// fill Lino player base and so there's a lot of emerging economy Dynamics going on there but it is a very interesting
// and totally unique way to approach gaming and again there's a lot of different approaches here I'm not
// playing gatekeeper I'm just saying here's all the pieces and as you can see Ronin has performed pretty well of about
// 3.4x since we covered on the channel and that has a lot I think to do with pixels online which is this game that has a ton
// of active users right now again very few games on Ronin there's a few games on Gala there's quite a few games that are
// connected with beam actually launching on it subnet as well as dozens and dozens of Investments by the Merit
// Circle Dow and then you have a mutable X which is kind of like the big daddy gaming coin which we hope hope breaks
// into the top 10 next we have cify as you know cify is a Launchpad these launchpads as the market gets super hot
// again if we are to get this Raging Bull Market launchpads will go bananas they will go absolutely crazy because they
// will give you early access to tokens before they hit the market and token launches in a bull market can go
// absolutely dummy High I'm talking 10 20 50 100x 200x and more in the peak heat
// of the bull market and so if you get into the launch pads you can actually buy allocations to these new projects
// sometimes just 500 bucks sometimes a few thousand doll but if things go 20x 50x
// and you instantly have those tokens you can flip and make 20K 50k sometimes even
// more in single days and that is the magic of launchpads but it only works during Peak bowl season so again cify is
// kind of the leading gaming Launchpad I have a ton of cify tokens I cover them first at 60 cents here and so you're
// looking at almost a 6X since I covered them again you are welcome team elot
// trades if you guys have been rocking with the channel here in 2023 you know this has been probably the best content
// streak I've ever been on and I only intend to keep pushing harder because getting bullish early in the cycle is
// lower risk whereas getting bullish at the ultimate Peak is the higher risk and I personally hope I can get the most
// amount of people excited about this Market at an early stage when most coins are probably going to do well as opposed
// to at the end of a cycle when most coins are set up to absolutely implode that is
// the best way to do it and I hope this content helps the maximum amount of people but again it's not a team sport
// here you all got to understand it is you and you alone out there in the crypto markets once you choose to buy some
// coins next we got Prime again this is one of the most legit trading card games here in the space you have a $119 2023
// low and uh their their current value is almost 9 bucks these guys are backed by a16z they're super duper legit and in my
// opinion this could be one of the highest performing gaming tokens of the cycle I'm definitely a big fan of what they're
// doing here and I hope hope they continue to crush it as you can see their fully diluted valuation here is almost a
// billion so they only have you know small amount of their token circulating like less than 30% of their token circulating
// so it really is a tiny uh circulating Market market cap and there will be token emissions here something to
// consider but they are one of the most advanced ecosystems and they definitely deserve a slot in anyone's gaming portfolio once again my philosophy on
// gaming is that it will eventually create mainstream hits the industry will continue to have some of the most
// attention and excitement surrounding it and when anything succeeds in gaming the rest of the tokens will get a lot of
// love so that's why I'm hyperfocused on gaming because as a niche I'm convinced it's going to succeed and its success
// will mean that focusing and distributing my bets within that niche in my opinion are most likely to succeed next we have
// neotokyo now this is a project that is mine obviously there are three projects here that I have founded and I cannot
// comment on for that reason I cannot tell you how risky they are or talk about prices or anything like that as a
// Founder but what I can tell you is that neotokyo has almost certainly fulfilled its highest aspiration of becoming the
// crypto gaming Illuminati the networking Club where the power Brokers of crypto gaming come to intermingle to share
// knowledge to build to launch stuff and that's why tons of projects want to actually launch to the neotokyo holders
// in this case immutable immutable X has recently joined literally every gaming project here is a part of neotokyo
// almost and it is very much so the place to be if you are a power broker in crypto gaming community members have
// created all kinds of projects one Community member actually created a Launchpad again this is not owned or
// controlled in any way by neotokyo or me or Becker but like cify someone created a Launchpad so that citizens could get
// access to projects before they launch and projects often times choose to want to come to neotokyo because they want
// these holders these Diamond hands these power Brokers to be a part of their projects and that's why neotokyo has
// been so successful is it is an absolutely phenomenal experiment that has succeeded in every way of becoming
// the networking Club of web 3 gaming now imposters is the game of the superverse now I do want to be very clear the best
// advice I can give you is to go put the Bell notification on for superverse just like this make sure that it's turned on
// because superverse will be shedding its skin and revealing an entirely new phase of the project that is very much so the
// connecting fiber between everything that you see in front of you in the crypto gaming space there is no doubt that this
// community is the biggest and most powerful in the crypto gaming space I've been spreading the good word about
// crypto gaming since 2018 I don't want to ruin this reveal because we've been working really hard on it but all I can
// say is turn post notifications on on superverse and understand that as hard as you see me working on content as much
// as you see me getting ahead of these Trends in the industry year after year week after week month after month year
// after year cycle after cycle I'm putting far more effort orders of magnitude more into these projects and you'll soon see
// the fruits of those labors now to be clear imposters is currently an nft form and the studio behind Impostors has
// recently hired an absolute legend in the form of Rick Ellis I highly encourage you to watch this interview where Rick
// Ellis list the new head of imposters actually explains why he's so bullish on web 3 gaming and his plan to take
// imposters mainstream again these projects are my primary focus and if you believe in what I'm doing then all I ask
// you to do is turn your notifications on for those projects because there is a lot coming in 2024 that you cannot see
// and if I'm right about this crypto cycle being the one which crypto gaming breaks through to the mainstream well there's a
// whole lot in store for these projects that you can't even imagine next this is actually the first project that I'm going to put on here that's unreleased
// this is called terse and when it comes to unreleased projects I want to be completely clear the hype before the release is totally damaging to the
// project and you do not if you're not one of the early investors you do not want to be buying these projects right out of
// the gate almost all new token projects during the Bull Run come out at astronomical prices they tend to pump
// and dump and you want to kind of stay away from them until they dump like crazy but again that depends on when
// they come out and when the tokens release but I will for your understanding just put these on your radar and I'm not going to talk too much
// about them cuz I don't want to create any artificial hype about them but I just want you to know that these are projects that are coming next year that
// I think are ones you should be researching and understanding token launches are very very tumultuous and
// you should definitely be careful when you get into any new token and understand the 360 view R rever gonzilla
// ready games pixels online and I'll also add in Heroes of mavia here again these are all super highquality gaming
// projects I've invested into most of them not all of them and again I'll follow up with more information when the time is
// relevant but I'm making a 2024 video I want you guys to know what I'm thinking about for 2024 next we have shrapnel
// shrapnel is one of the hottest gaming tokens they have one of the sickest looking games they're competing in the
// Big Show which is firstperson Shooters they have their own subnet on Avalanche I certainly certainly hope that they
// succeed in their mission again any game succeeding is good for all of the games and I'm very hyped on what they're doing
// definitely part of my 20124 portfolio next big time again I never put calls on trapal big time so I just have na here
// but again big time and trapnel are two of the best looking games in the industry right now big time is one that
// is very interesting because if you're actually farming within the game you can play an MMO RPG and players are making
// up to six figures over the last few months farming their big time tokens it is something that probably won't last
// forever so if you're looking to spend some time and grind a game and maybe end up earning some crazy amounts of tokens
// I highly suggest you check out big time and of course we have cus again I've covered cus in depth they're adding a
// LaunchPad had they burnt a ton of their supply they have tons of games in their ecosystem and they are up almost 10 full
// X's since we covered them here on the channel absolutely Smokey no jokey gains
// here out of cus their goal is to focus on browser gameplay totally democratized
// no fancy chips required and they believe that the Casual gaming route is the way to onboard billions of users again
// everyone has their own strategy some games are going for immersive AAA like you're seeing with gonzilla like you're
// seeing with shrapnel like you're seeing with eluvium another one that's on my list for 2024 I don't know why it's not
// here some are going for more casual games like cus mobile games like maavia or wagi and then you also have more
// economic games like you saw out of axi Infiniti and you're seeing the same thing out of pixels online next I'm just
// going to be real this risk rating again the risk rating for all the ones in yellow is high that means you know you
// could have a 20 to 50x but you could see a 90% correction this is big big risk
// right the medium highs you're seeing maybe a 15x or an 80% correction medium you have a 75% correction and a 12x you
// just have to understand the risk scale here and again this is not very sciency I just literally pulled these numbers
// out again this is like astrology for men here embrace it we're just looking to the stars but we're hoping that we get
// something right I've caught a lot right over the years it doesn't mean that I have special powers okay I'm just a dude
// with a webcam and this bright light and a neon sign and a pudgy penguin toy okay speaking of the memes I told you I only
// have two meme positions that is Pepe and Bon and since I said that Bon has gone on such a ripper it's up 3.1 6X and
// rumor has it it's going to get listed on coinbase again this is proof that the salana ecosystem is absolutely on fire
// okay absolutely on fire heepe I still think is the Daner meme by so many orders of magnitudes hoping that the
// Frog gets its legs under it and has like a Dogecoin moment at some point in the future I don't know I could be wrong
// it's still up a bit here from where I called it only 37% not crazy here but it's up right it's up we don't turn our
// noses up at gains here not after a three-year bare Market we do not turn our noses up at gains even small gains
// now the other thing that is a strategy here and this is so degenerate this is seek medical help degenerate this is you
// need to see a doctor okay you need to see a doctor if you're doing this there's something wrong with you but if
// you do want this level of 100x 200x gains from buying literal abysmal meme coins then what you want to do is look
// for the alternate l1s like Avalanche like Cosmos ecosystem chains and you want to see when they create their
// leading meme coins if you're early to those you could maybe ride on a real rocket ride here and so that's the dgen
// next level stuff is buying meme coins that are not goated like Pepe and Bon those ones are so absurdly risky it's
// not even worth discussing here you really you really just need help you need help you need Jesus next we have the AI Niche and I'm telling you guys my
// main focus here is aosh I have my own validator on aosh so you can delegate to it it's called ELO trades new go ahead
// and delegate towards it I think AOS is doing something that almost nobody is they're allowing for subletting of GPU
// power again AI will continue to make massive news throughout this cycle every few months there's a new AI explosion of
// interest and excitement and drama that will continue driving crazy amounts of attention excitement and investment into
// AI cryptocoins that means that things like AOS which allow you to lease computing power which is the driver of
// AI right now compute power is what this is all about things like aosh will potentially become massive massive
// focuses going forward there's also a bit tensor that's kind of like the leading one I don't have a big bag of it because it literally doesn't know how to dip
// it's just been going absolutely bananas it literally will not dip but I do think that if cool apps start launching on top
// of benser the tow token that could be something to look for again aosh is
// something I've been holding for years I believe they'll continue to crush it and if I were to say so it's my favorite AI
// coin I don't have a ton of AI coins but I do believe Ai and gaming will be the driving narratives of this bull run
// onward if you're looking for a little something extra there's dexes like dydx okay I could see Americans getting
// frustrated not having access to Futures Trading because none of the exchanges let Americans on anymore so
// decentralized Futures like dydx could become interesting again it doesn't pump very hard but I think their new version
// of their protocol which shares fees is quite interesting for me the nft play besides obviously neotokyo and imposters
// the nft play that is most likely to pull a board ape this cycle is pudgy penguins and that's because lucanet the CEO is an
// absolute Beast I'm a friend of his and I think his vision is going to take him somewhere crazy so if there's a next nft
// that is pudgy Penguins you're looking at to me the only thing I see as a pfp project that could hit 100 eth plus I
// think pudgy Penguins would be that crazy one again they've traded as low as 4 eth this year they're up quite a bit but
// they just keep delivering and they recently previewed this pudgy World concept which to me screams that they're
// making a video game and that they will transition from being a consumer packaged Goods project to being a video
// game project which to me is giga bullish cuz gaming to me is the thing I believe in the most most next if we're talking
// about ways that you can enhance your 2024 portfolio you're going to want to look at rotations this is when certain
// ecosystems like salana Ava Cosmos whenever they get hot you'll see the coins within those ecosystems get hot
// again I don't know what those coins are I'm not bringing attention to any of them in specific but let's just say you didn't want to do gaming for some reason
// or you didn't want to do AI you wanted to play in specific ecosystems this is one way to do it I'll end here with
// finally two D5 plays one of which I was an early investor into called Prisma I personally think Prisma will have a
// really nice future again I'm an early investor I plan to hold those tokens for a significant amount of time and see how
// the project performs it's still pretty under the radar as well this is in the liquid staking token narrative where you
// can stake your stake eth and get additional yield on top very interesting project as well as Rune which allows you
// to do onchain swaps between things like ethereum and Bitcoin I think Rune is kind of in its own category so Prisma
// and Rune are the two that I like for defi if I was to pick a defi coin okay
// this Raw video file is now almost an hour and 10 minutes if you guys feel like I delivered a tremendous amount of
// value for this 2024 portfolio overview the way I've gone through and explained why I'm in each one of these coins the
// risk involved the upside the downside the left side the right side then smash that like button and make sure you subscribe with that Bell notification on
// I believe that this is going to be one of the most incredible Cycles we've ever seen but of course there is a risk it doesn't play out if it does however I'm
// confident that gaming will be the most transformative place to be and I'm excited to continue to show you the light throughout this journey if I
// missed your favorite token you know what to do leave me a comment in the comment section below if you enjoyed this video check out this one that I made just a
// few days ago which goes even into more detail on some alt coins that I love as always I'm elot trades and I'll see you
// very soon on the next
// episode
//  `,
//   });
// console.log(
//   ` Transcript: ${transcript} \n Usage: ${usage} \n Entities: ${JSON.stringify(
//     entities
//   )} `
// );

/* console.log(
  await getEntitiesNer({
    transcript: `while things are macro going down you want to sell them as they rally up cuz that's your chance to get out at a good 
price now I wanted to add in here that Bitcoin is now in a dip and the whole Market has pretty much taken a massive 
dip well not every coin of course beam and immutable X are still crushing it but you you know most of the coins here 
have taken a bit of a dip there's plenty of coins in the red here over the last few days and honestly it's kind of 
popping up right now so you know it's at 42,
    000 if it gets back above this you know $43,
    000 Mark or so you know if it 
gets back Above This 425 or specifically above 43 44 this dip is over right this 
is going to to new highs for the year what I want to impress upon you is this dips are effectively the thing that you 
want you don't want to just be chasing when things are up up and away that might feel like the best time to invest 
it certainly is the most exciting but what you really want to wait for are the times that it's not exciting again so if 
this dip gets worse goes down into the 30s or so maybe even the low3s that would not be the end of times now it 
would be very concerning if we go below you know 31,
    000 or 32,
    000 that is a very 
sensitive area and might signal a much more difficult time for Bitcoin ahead 
really all of crypto but in the case of right now anything above 32,
    000 to me is 
a massive massive opportunity if it comes down and the more uncomfortable it gets the more the Bears come out of 
their caves and start screaming it was all a dream this was the biggest bull trap in the history of the world well 
that to me my friends is the time that all be looking to smash the buy button but again I'm not doing too much right 
now I've been buying throughout 2023 and so I'm pretty well positioned here coming into 2024 but I hope this video 
helps you out a lot and back to the analysis so the point is right now we are still in this three candle which is 
right before the two most parabolic years the two best years of the Bitcoin cycle that is if the cycle is to 
continue to play out the way it worked before now a lot of people don't believe in this cycle stuff but get this you 
want to see something crazy from the all-time low in 2015 to the all-time high in 2017 it was exactly 
1,
    64 days from the all-time high in 2017 to the all-time low in 2018 it was 
exactly 364 days from all-time low in 2018 to alltime high in 2021 1,
    64 days 
again exactly the time from low to high and then once again from all-time high 
in November of 2021 to alltime low in November of 2022 
364 days honestly some things are Stranger Than Fiction and Bitcoin very 
well might be one of those maybe we're all in a simulation maybe this is all some collective delusion maybe there are 
no coins at all what I do know is that as long as this Bitcoin cycle continues to show itself and prove itself out as 
it has once again in 2023 I feel like I would be a damn fool not to bet hard on 
the industry that I log into and talk about and obsess over every single day so that's what I'm doing but make no 
mistake this is risky business and everything you buy into could be manipulated crash the founders could end 
up not being honorable or doing the right thing the code could get hacked stuff is very very risky and you assume 
a 70 to 100% loss whenever you buy anything in this crypto space the 
trade-off here is you're trading a 70% downside for a potential thousand or 
10,
    000% upside that's 10 to 100x upside versus a near total loss those are 
better odds than you're going to get in Vegas almost any day of the week and for that reason I'm all in on crypto gambling to make my life better and if 
you're here in crypto right now watching a video like this you need to slam down some hard to swallow pills and 
understand that you're gambling too well to be fair we all need to gamble that's what the Fiat system forces us to do cuz 
your money turns to dust in your wallet your labor is not worth anything anymore we need to gamble in stocks in real 
estate in assets of some kind if you want to get ahead and to me crypto is the one that I know and it's the one 
that I think is the most generous and most likely to help people Achieve Financial Freedom so I'm gambling here 
and with that said let's get to my portfolio for 2024 of course we should add that Michael sailor the biggest bull 
on Wall Street believes Bitcoin will hit a $350,
    000 price in 2024 now that would 
mean that Bitcoin is about 10x from here of course what we saw over the last one 
was Bitcoin went about 3x over its prior all-time high now if Bitcoin goes to 350k that would mean it would do a 5x 
over its prior all-time high whereas last cycle it did about a 3 and 1/2x over its prior alltime high so it's 
going way higher and that would mean that what we'd see out of total three meaning the altcoins would probably be 
even more dramatic right we saw a gain here of total three which went from about 300 billion up to 1.3 trillion 
this was about a 212% gain or almost a 3X out of the altcoins now if we go 50% 
more that means we could see about a 4X out of the altcoins from prior all-time high and that would mean altcoins alone 
would be at $4.5 trillion doll not to mention you add in Bitcoin and eth you have crypto scratching its head on 
nearly $1 trillion in market value that my friends is the size of gold and that 
my friends is a whole new ball game as they would say and as always I solicited the community I said I'm doing my 2024 
portfolio video this week what coins should I include and I literally in a few hours got almost 1,
    000 responses and 
they were really bad they were terrible I am not taking advice from you guys ever again I don't know what you're trying to do to me but please God stop 
trying to give me Alpha because it is not working anyway back to the show all right let's get into it this is going to 
be a complete breakdown of the 2024 portfolio and I'm not going to give you exact percentage size of these tokens 
but I'm going to give you a general idea on how I'm organizing my portfolio as a whole and then I'm going to give you the 
actual products within each category and this is going to be an absolutely monstrous amount of information so get 
ready smash that like button and make sure you're subscribed with the Bell notification on each video we've come 
out with over the past few weeks I've been trying to make sure that they are so loaded with information that they are 
effectively unmissable okay the first one where we started doing this was 185k 
views we're going to have our first video Hit 200k K views in what feels like years I'm sure it has been and 
every single video here I've been pouring my heart and soul into making sure that they are jam-packed with Alpa 
so make sure you put the Bell notification on because everything I put out on this channel going forward will 
be in my opinion required viewing you absolutely must watch this stuff if you 
want to be ahead of crypto no channel is covering these niches and these movements like I am and I'm giving this 
all to you for free and I'm trying to make sure that I don't waste any of your time here so hit that Bell notification 
and you will be in my opinion way ahead of everyone else but again as I go through these coins I want to be very 
clear I will explain my logic as to why I like these coins but in the end this 
community is getting so big and so many people know about the strength of this community that inevitably if you're 
following the coins here only on this list then you're always going to be late I want you to take the ideas here the 
mental models of how I'm finding and analyzing coins in this market which I explained in detail and I want you to 
apply them on your own and that way you can be ahead instead of buying a YouTuber coin like I'm going to be 
covering here it's going to allow you to get ahead of everyone else but only if you do these things and do the hard work 
on your own with that said I hope this information helps you now starting at the top we have salana okay this is a 
risk ranking and by the way you see my technicolored risk ranking chart here again this is completely made up right 
I'm just trying to give you a sense here of where the the bigger risks are uh blue chips and the medium and the medium 
highs those are just going to be lower gains there's still a ton of risk in those coins right everything has risk in 
this industry could get sued by the government founder could die you never know crazy world lot of smells Anything 
Could Happen okay but anyway enough of that salana you guys know my thesis here salana is the best competitor to ethereum and everything in the salana 
ecosystem Has Gone Bananas I started giving you guys salana in the teens in the low 20s and it has absolutely 
crushed it it peaked I think at about $75 um I'm just calling my ET call here 17 though I know I talked about it 
around the 13 range I just think I was more forceful around the $17 range and so the gains so far are 321 per or 4.21 
x's and the downside and this is how I'm calculating this the downside is the 
2023 low so the low value in 2023 I don't think the market goes and revisits 
those I think that's a hard bottom and so my logic is your downside in this category is effectively the current 
value and that is divided by the or the the 2023 low divided by the current 
value and that allows you to see effectively how low you could go if we revisit those lows which is possible 
right if there's some apocalyptic scenario and Bitcoin just shreds through 32k and everything turns out to be a 
massive bull trap and kappo was right well I guess this is possible right we could go revisit those 2023 lows so I'm 
just showing you your max downside but just know essentially salana has taken on this super Blue Chip status as a 
testament to that projects like gito which are essentially like Lio or Flash Bots in the salana ecosystem are being 
valued at multi-billion dollars that's $3 billion fdv for a project like jeto 
which arguably might be seen as too much too soon but it just shows you how significant the salana ecosystem is that 
people are valuing uh the coins in the salana ecosystem as equal to their ethereum counterparts and that's a 
massive narrative so like I said I'll be rotating profits from trades into salana as part of my strategy and that is one 
that I keep getting laughed at in the YouTube comments so if you want to keep laughing at me go ahead I appreciate it 
every time I've been laughed at and mocked for my choices that I'm making publicly here for you all it's turned 
out to be a massive Money Maker so reply guys eat your heart out because you are my best indicator that I'm doing 
something right I know it's a hard pill to swallow but we have a lot of coins to get through so we are going to start getting through them the second one is 
chain link again chain link is one of the most important protocols in the entire space they're integrating with 
swift that's right the banking Swift they are one of the most legitimate ways to communicate between chains and 
protocols if you have dexes that are feeding in prices well they're using an Oracle and that is coming in through 
chain link chain link is effectively part of most if not all of Defi and it 
is a blue chip by all standards again Blue Chips they have a potential for maybe a 10x or so from here maybe a 15x 
in a very good situation but they're also lower risk they're not going to dump as fast they have much more 
significant holder bases and chain link is definitely a blue Blue Chip to have on your radar it's part of my portfolio 
and if you want a more passive portfolio things like salana and chain link are definitely in that lower crypto risk 
almost guaranteed to be here for the next several years if not on into the future next we have coinbase as you know 
I'm a big bull on coinbase stock after the fall of CZ and FTX they are the last 
man standing and they are the white knight of crypto publicly listed on the stock market I've been aping coinbase 
like a madman since about $60 here $65 is when I covered it on the channel and 
that would mean that we're about 2.1x over my call and I keep adding to my coinbase position just cuz it's really 
easy to do for my bank I have sort of my Fiat and crypto worlds separated and it's a really nice easy thing to do that 
I've been rotating out of my treasury bills and into coinbase stock largely from my treasury bills and it's been an 
insane play I also think coinbase is a blue chip in that it's not going to do more than a 10x here in fact if it hits 
$1,
    000 I would be kind of mind blown I think that that's possible in like a total blowoff top but really I'm just 
hoping it makes new highs around $500 to $1,
    000 at the end of the cycle in 20125 
that would be a blessing and I think that that is a peak price for coinbase this is the only stock you're going to 
see here but it trades like a crypto so of course if you want something more passive these are things you can just buy and know they're going to be here 
years from now and probably going to grow with the cycle now we get into something a little more spicy which is Avalanche as you guys know I've been a 
big Avalanche bull throughout the years I was first on avax in 2021 one I was 
one of the first YouTubers to bring avax and the avax ecosystem coins like Joe and some other Crazy Ones to the frame 
here Joe's like the Unis swap of avalanche again Avalanche is to me the next in line after salana as far as 
hyped layer one ecosystems and it is slightly off of Blue Chip it's not a blue chip it's a medium risk and just to 
show you here it's been tracking actually the gains of salana really really well if you look here soul is 
about 73% off its high Avalanche through most of the markets about 74% off its 
alltime high it was almost identical in its percent draw down from alltime high for the entirety of the bare market and 
so these two will probably make their way up to alltime high in a similar fashion and if you really study the 
actual movements Avalanche is a really interesting evm Tech again the layer one ecosystem has a ton of competition there 
are so many chains now but I just think there's some muscle memory in the charts here because Solana Luna and avax were 
like the trio of 2021 obviously Luna nuked and doesn't really exist anymore but salana and avac when salana makes a 
really big run avac seems to want to play catchup and look what is a medium risk goated L1 if you don't have polygon 
now polygon markets itself as a layer two but it really kind of in practice is a layer one though they are starting to 
connect the dots here with their cdk right so they have this chain development kit where they effectively 
allow people to launch their own ZK EVMS now this is very next gen and it's in fact the technology that underpins the 
newest initiative from immutable X which is of course also on this list and a project that we'll talk about shortly 
but together this is part of the three-headed dragon of gaming and polygon is beyond that it's also really 
good Tech and I know this from my developer friends which throughout 2021 really didn't like the technology that 
underpinned polygon they've made big strides and in my opinion their ZK Tech has started to become best-in-class and 
really next gen so it's something to consider that polygon and their technology keeps evolving and they're 
about to evolve from the madic token to the pole token again showing their firm transition to 
ZK rollup technology this is something to keep your eyes on and I have no reason to believe that polygon won't 
have a massive run in 2024 with the rest of the market again this thing went on 300X it was trading between 1 and 5 
cents when I was covering it like crazy in 2019 and 2020 and in 2021 it went on 
its hallowed run up to $3 it's pretty insane next one up is injective and in 
this case you want to trust the strength of the chart look at this this is one of the best performing assets of the entire 
market and one of the few that has actually broken its prior all-time high you can see its prior alltime high was 
about 24 bucks here and today it is sitting at $26 this is the way that you 
understand that strength begets strength and obviously we've talked about injective in fact we were one of the 
first people to cover injective at the beginning of the 2021 run at the end of 2020 we covered injective at 70 I 
actually participated in the early token sale and was able to get tokens at 70 
here and we rode this thing up as a community up to $22 absolutely astronomical but look it takes a very 
special type of team to be one of the first to overcome your prior highs in the new cycle and this chart is screaming that it wants to remain strong 
so again injective is a defi protocol is part of the cosmos ecosystem and you'd be a fool to fade this kind of strength 
in a new cycle next we have Celestia now Celestia is like a nerds Paradise again 
in the cosmos ecosystem both of these are they are their own layer ones and again I put them as medium high because 
they are newer Kids on the Block they are not as established as Avalanche they are not as established as polygon they do not have as many fundamentals driving 
them in fact Celestia's brand new and trading like an absolute beast but at the same time I think Celestia's Tech is 
very exciting to people and the strength of its chart simply cannot be denied I mean essentially it doesn't really know 
how to take a dip it's absolutely crazy obviously we talked about it here at about four bucks I had people talking to 
me about it at $2 but I missed that move and as you you can see the strength is just undeniable even when Bitcoin had 
this dip it just exploded upwards it shows you that there's true demand here for Celestia some additional Alpha here 
is that I'm hearing that there's going to be a ton of Celestia airdrops so if you're staking Celestia you'll get a ton 
of these projects that are launching on Celestia essentially giving you free tokens air drops so if you're staking the Tia coin then you could be eligible 
for some aird drops again this is all early Alpha but in addition they have a 16% APR so you stake you get some 
Celestial rewards and then you get some free tokens on top of it if this thing moons like crazy it could be one of the 
gigabrain plays of the cycle I'm certainly hoping it is now the last one is internet computer and what's crazy 
about this chart is I don't think I've seen a worst looking chart in my whole life like it is easily the worst looking 
chart of all charts however that is actually kind of a benefit when you zoom in you realize that almost all their 
tokens are in market right they have a total supply of 510 they have 450 circulating that's like I don't know 80 
or 90% there and so there's not a lot of inflation and this thing went through this crazy crazy dump where effectively 
everyone got mad and sold and its reputation went down but meanwhile they kept developing stuff and it's got this 
decentralized storage play that I actually think makes it slightly different than other layer ones it's not 
directly competing with the likes of soul and stuff who knows anyway I have some internet computer in my portfolio 
cuz I think there's a chance and if you see here it hasn't pumped very much its low was like three bucks it's up at like 5.6 it's not even 2x off its lows and 
get this the all time high was $700 right it's sitting here at $5 
that's literally more than 100x it's n it's over 99% down from its all-time high so if it does go back and tickle 
its all-time high which I think of as absolutely absurd it probably won't do that well it's just like there's just a 
lot of room for this thing to go that these are the charts that if they get going could mean business if they get 
serious again I have a very small amount of my portfolio but I figured it was worth a bet in case this thing does wake 
up next there's a project called monad it is not released yet it's in my uh unreleased and I just gave it a risk 
because I don't really know what the risk is cuz I don't know what the price is risk is heavily correlated to price 
if you don't know what the price is you can't determine the risk but anyway this is an upand cominging project that a lot 
of people are hyped about and I would not be shocked if this thing ends up catching some serious hype waves if we 
do get this bull run that we're all really hoping for this is one to have on your list definitely go ahead and follow 
it the next is layer zero again this is going to be one of the biggest coins in the the whole ecosystem and you can 
actually likely qualify for their airdrop if you're using their Stargate Finance defi application which allows 
you to bridge assets between different chains I highly encourage you to understand what layer zero is as this is 
likely to be one of the biggest token launches in the whole industry coming up soon shout out to the layer zero team because I've actually been collaborating 
with them on some other stuff again stuff that will be announced in 2024 now I want to be clear those are like the 
big coins those are the big pieces of tech out here that I want you to be aware of and most of those are lowerer 
risk and we'll have most likely pretty muted rewards we're not talking about 100 X's here like if Celestia goes 100x 
it would be worth like a quad zillion dollars that's not going to happen those are maybe 10 to 20x plays at the max but 
probably some of them will be closer to 5x plays in my opinion having too much of your crypto portfolio tied up in 5x 
plays feels like a waste that's my particular approach and to explain this in a little more depth I'm breaking out 
my portfolio breakdown which is in the end I have a lot of money in Treasures which I'm actually rotating quite a bit 
of money out of there because I believe interest rates have peaked and that risk is going to be the new thing to allocate 
towards that's my particular approach but in the end I have what's called a crypto barbell where on one side of the barbell I have lower risk stuff stuff I 
know is going to be there for a very long time stuff like Bitcoin stuff like coinbase stock stuff that I don't need 
to wake up in the middle of the night sweating and think has it all gone to zero has it all just evaporated into 
dust yeah yes this is the high conviction long-term bucket and in that high conviction long-term bucket we have 
Bitcoin we have ethereum we have salana and we have coinbase stock and that bucket actually has been updated because 
coinbase has been ripping salana has been absolutely ripping and this is how my long-term conviction bucket looks now 
I'm actually rotating profits whenever I do take them into salana that's my personal approach again I might rotate 
profits into some other exotic L1 if I get really carried away but this is my general plan I'm going to try to stick 
to my plan as much as I can it's also really important to make plans and write them down because the emotion of the market will carry you off into La La 
Land if you let it and if you write stuff down you can at least sober up for a second and pull yourself out of the 
Psychedelic Bull Run acid trip that has long since left planet Earth and you're 
contemplating whether a dogcoin on butthole chain can be worth $10 trillion because you saw a tick tocker made a Tik 
Tock about it and you're just wondering what the point of life is because you haven't talked to your friends in months 
and you stare at a screen all day trading crypto coins that's what the bull Run's like all right you lose your godamn marbles so keep it together all 
right keep it together and write stuff down all right a little break from the video here because if you're new to crypto you need to have a VPN and that's 
why I'm extremely proud to partner with nordvpn and be one of their leading Partners in the whole crypto space 
because if you don't have a VPN you're literally like a lamb to the slaughter here your IP address will start showing 
up on crypto sites which even though the blockchain is secure those sites could be compromised and your IP address 
effectively you could become a Target so you want to make sure that you avoid that situation with a product that only 
cost $3 per month but what's great is you get a massive discount if you use my link below again I was hacked a few 
months ago and so I take cyber security extremely seriously like I've said many 
times before you can be forgiven for a lot of mistakes in crypto a lot of them are understandable in fact even ogs make 
mistakes but one thing you will not be forgiven for is not having a VP VN it's so cheap it's so easy and best of all it 
supports the channel and I appreciate you guys so check out nordvpn sponsor of today's video and let's get back to some 
good old fashion cryptocoins back to the point here I personally think that the zero Infinity bucket is worth allocating 
to now I personally think the zero Infinity bucket has odds that in a bull run make sense because in a bull run if 
Bitcoin continues to grow usually altcoins will continue to grow especially early on in the bull run and 
quite Frank Al the risk if Bitcoin doesn't continue to grow is it could drop dramatically I mean bitcoin's up 3x 
on the year so I mean the thing could drop like 70% and still only be touching 
its 2023 low that my friends is a huge amount of downside but if you're upside 
is you know somewhat limited compared to the 100x opportunities out there and those 100x opportunities are likely to 
hold and grow if Bitcoin holds and grows then to me the crazy Bull Run logic is 
you want to be allocated in some way to these altcoins the zero Infinity bucket knowing that it goes to zero or the damn 
Moon and you're comfortable with the odds of it doing one or the other and you're ready for either outcome that's 
where I'm at again make your own decisions I have enough fiat currency I have enough cash in my world that if my 
crypto goes to zero I'll keep eating I'll keep surviving and my life won't be changed obviously it would suck ass but 
I would still continue to live and survive and pay rent a lot of people aren't in that same boat so you have to 
make the decisions based on your own Financial decisions I'm not going to be there to pay your rent or to feed your 
kids if you can't do it you got to take care of your own period okay so let's get to the fun stuff okay beam 
Merit Circle again they were called Merit Circle I covered them at about 40 cents and they've shot up here to what 
was the equivalent of $2 but when they did a 1 to 100 split on beam now the price is reflected you can think of this 
as 0.0043 or something like that so they've done about a 4.4x since I covered them absolutely smoking those 
gains and they are one of the most important coins in the crypto gaming space they have a ton of Investments 
they have a treasury of nearly $100 million they are actively invested in some of the best games in the space and 
they are now partnered with immutable X to bring some cool technology to the immutable X ZK evm speaking of immutable 
X they are also on this list as you know I an immutable X seed investor I'm a massive investor in beam and I have huge 
huge bags of both of these tokens and I am so happy to see them climbing the ranks with absolutely Reckless abandon 
here and I have no reason to doubt that they will continue to grow as gaming continues to grow my hope is that 
immutable X becomes the first gaming token to crack the top 10 in crypto market caps and just for some 
perspective here it's at $2.6 billion market cap the top 10 is 13 here so it 
would have to five or 6 x from here to overcome the Doge and to me that would 
have to do that you know against the market so this would take take a massive gaming run but I don't think it's insane 
I think it might happen here and if it does happen then that might mean that beam becomes a top 25 coin or something 
like that again understanding that crypto is about categories niches storylines and if one coin from a 
category makes it astronomically High the entire category will reprice under it so the higher immutable goes that 
creates a higher ceiling for the rest of the gaming ecosystem to flourish in so as a massive gaming bull I'm very 
excited that immutable X is continuing to crush on the way up and that to me paves the way it blazes a trail for all 
of gaming to repic under it so as you see a mutable X make this massive run know that it's bullish for all of gaming 
that's the facts Gala as we've said they are a publisher they have several games and they had a massive destructive run 
down from their all-time high their all-time high was like 70 cents they're currently at three here so on their way 
back up if they are to make it back up could do astronomical gains again their downside is about 60% % they haven't 
pumped too hard here as you can see these other ones have pumped much harder they're up much more significantly but 
about 2.1x since we called it here on the channel Ronin again similar to Gala 
they have some games far less games here like immutable has like hundreds of games that are coming to the immutable 
xchain but Ronin has axi Infinity which was the most successful crypto game of all time and they also have now pixels 
online which has 400,
    000 active users now the thing about the Ronin ecosystem is it caters largely they have a huge 
fill Lino player base and so there's a lot of emerging economy Dynamics going on there but it is a very interesting 
and totally unique way to approach gaming and again there's a lot of different approaches here I'm not 
playing gatekeeper I'm just saying here's all the pieces and as you can see Ronin has performed pretty well of about 
3.4x since we covered on the channel and that has a lot I think to do with pixels online which is this game that has a ton 
of active users right now again very few games on Ronin there's a few games on Gala there's quite a few games that are 
connected with beam actually launching on it subnet as well as dozens and dozens of Investments by the Merit 
Circle Dow and then you have a mutable X which is kind of like the big daddy gaming coin which we hope hope breaks 
into the top 10 next we have cify as you know cify is a Launchpad these launchpads as the market gets super hot 
again if we are to get this Raging Bull Market launchpads will go bananas they will go absolutely crazy because they 
will give you early access to tokens before they hit the market and token launches in a bull market can go 
absolutely dummy High I'm talking 10 20 50 100x 200x and more in the peak heat 
of the bull market and so if you get into the launch pads you can actually buy allocations to these new projects 
sometimes just 500 bucks sometimes a few thousand doll but if things go 20x 50x 
and you instantly have those tokens you can flip and make 20K 50k sometimes even 
more in single days and that is the magic of launchpads but it only works during Peak bowl season so again cify is 
kind of the leading gaming Launchpad I have a ton of cify tokens I cover them first at 60 cents here and so you're 
looking at almost a 6X since I covered them again you are welcome team elot 
trades if you guys have been rocking with the channel here in 2023 you know this has been probably the best content 
streak I've ever been on and I only intend to keep pushing harder because getting bullish early in the cycle is 
lower risk whereas getting bullish at the ultimate Peak is the higher risk and I personally hope I can get the most 
amount of people excited about this Market at an early stage when most coins are probably going to do well as opposed 
to at the end of a cycle when most coins are set up to absolutely implode that is 
the best way to do it and I hope this content helps the maximum amount of people but again it's not a team sport 
here you all got to understand it is you and you alone out there in the crypto markets once you choose to buy some 
coins next we got Prime again this is one of the most legit trading card games here in the space you have a $119 2023 
low and uh their their current value is almost 9 bucks these guys are backed by a16z they're super duper legit and in my 
opinion this could be one of the highest performing gaming tokens of the cycle I'm definitely a big fan of what they're 
doing here and I hope hope they continue to crush it as you can see their fully diluted valuation here is almost a 
billion so they only have you know small amount of their token circulating like less than 30% of their token circulating 
so it really is a tiny uh circulating Market market cap and there will be token emissions here something to 
consider but they are one of the most advanced ecosystems and they definitely deserve a slot in anyone's gaming portfolio once again my philosophy on 
gaming is that it will eventually create mainstream hits the industry will continue to have some of the most 
attention and excitement surrounding it and when anything succeeds in gaming the rest of the tokens will get a lot of 
love so that's why I'm hyperfocused on gaming because as a niche I'm convinced it's going to succeed and its success 
will mean that focusing and distributing my bets within that niche in my opinion are most likely to succeed next we have 
neotokyo now this is a project that is mine obviously there are three projects here that I have founded and I cannot 
comment on for that reason I cannot tell you how risky they are or talk about prices or anything like that as a 
Founder but what I can tell you is that neotokyo has almost certainly fulfilled its highest aspiration of becoming the 
crypto gaming Illuminati the networking Club where the power Brokers of crypto gaming come to intermingle to share 
knowledge to build to launch stuff and that's why tons of projects want to actually launch to the neotokyo holders 
in this case immutable immutable X has recently joined literally every gaming project here is a part of neotokyo 
almost and it is very much so the place to be if you are a power broker in crypto gaming community members have 
created all kinds of projects one Community member actually created a Launchpad again this is not owned or 
controlled in any way by neotokyo or me or Becker but like cify someone created a Launchpad so that citizens could get 
access to projects before they launch and projects often times choose to want to come to neotokyo because they want 
these holders these Diamond hands these power Brokers to be a part of their projects and that's why neotokyo has 
been so successful is it is an absolutely phenomenal experiment that has succeeded in every way of becoming 
the networking Club of web 3 gaming now imposters is the game of the superverse now I do want to be very clear the best 
advice I can give you is to go put the Bell notification on for superverse just like this make sure that it's turned on 
because superverse will be shedding its skin and revealing an entirely new phase of the project that is very much so the 
connecting fiber between everything that you see in front of you in the crypto gaming space there is no doubt that this 
community is the biggest and most powerful in the crypto gaming space I've been spreading the good word about 
crypto gaming since 2018 I don't want to ruin this reveal because we've been working really hard on it but all I can 
say is turn post notifications on on superverse and understand that as hard as you see me working on content as much 
as you see me getting ahead of these Trends in the industry year after year week after week month after month year 
after year cycle after cycle I'm putting far more effort orders of magnitude more into these projects and you'll soon see 
the fruits of those labors now to be clear imposters is currently an nft form and the studio behind Impostors has 
recently hired an absolute legend in the form of Rick Ellis I highly encourage you to watch this interview where Rick 
Ellis list the new head of imposters actually explains why he's so bullish on web 3 gaming and his plan to take 
imposters mainstream again these projects are my primary focus and if you believe in what I'm doing then all I ask 
you to do is turn your notifications on for those projects because there is a lot coming in 2024 that you cannot see 
and if I'm right about this crypto cycle being the one which crypto gaming breaks through to the mainstream well there's a 
whole lot in store for these projects that you can't even imagine next this is actually the first project that I'm going to put on here that's unreleased 
this is called terse and when it comes to unreleased projects I want to be completely clear the hype before the release is totally damaging to the 
project and you do not if you're not one of the early investors you do not want to be buying these projects right out of 
the gate almost all new token projects during the Bull Run come out at astronomical prices they tend to pump 
and dump and you want to kind of stay away from them until they dump like crazy but again that depends on when 
they come out and when the tokens release but I will for your understanding just put these on your radar and I'm not going to talk too much 
about them cuz I don't want to create any artificial hype about them but I just want you to know that these are projects that are coming next year that 
I think are ones you should be researching and understanding token launches are very very tumultuous and 
you should definitely be careful when you get into any new token and understand the 360 view R rever gonzilla 
ready games pixels online and I'll also add in Heroes of mavia here again these are all super highquality gaming 
projects I've invested into most of them not all of them and again I'll follow up with more information when the time is 
relevant but I'm making a 2024 video I want you guys to know what I'm thinking about for 2024 next we have shrapnel 
shrapnel is one of the hottest gaming tokens they have one of the sickest looking games they're competing in the 
Big Show which is firstperson Shooters they have their own subnet on Avalanche I certainly certainly hope that they 
succeed in their mission again any game succeeding is good for all of the games and I'm very hyped on what they're doing 
definitely part of my 20124 portfolio next big time again I never put calls on trapal big time so I just have na here 
but again big time and trapnel are two of the best looking games in the industry right now big time is one that 
is very interesting because if you're actually farming within the game you can play an MMO RPG and players are making 
up to six figures over the last few months farming their big time tokens it is something that probably won't last 
forever so if you're looking to spend some time and grind a game and maybe end up earning some crazy amounts of tokens 
I highly suggest you check out big time and of course we have cus again I've covered cus in depth they're adding a 
LaunchPad had they burnt a ton of their supply they have tons of games in their ecosystem and they are up almost 10 full 
X's since we covered them here on the channel absolutely Smokey no jokey gains 
here out of cus their goal is to focus on browser gameplay totally democratized 
no fancy chips required and they believe that the Casual gaming route is the way to onboard billions of users again 
everyone has their own strategy some games are going for immersive AAA like you're seeing with gonzilla like you're 
seeing with shrapnel like you're seeing with eluvium another one that's on my list for 2024 I don't know why it's not 
here some are going for more casual games like cus mobile games like maavia or wagi and then you also have more 
economic games like you saw out of axi Infiniti and you're seeing the same thing out of pixels online next I'm just 
going to be real this risk rating again the risk rating for all the ones in yellow is high that means you know you 
could have a 20 to 50x but you could see a 90% correction this is big big risk 
right the medium highs you're seeing maybe a 15x or an 80% correction medium you have a 75% correction and a 12x you 
just have to understand the risk scale here and again this is not very sciency I just literally pulled these numbers 
out again this is like astrology for men here embrace it we're just looking to the stars but we're hoping that we get 
something right I've caught a lot right over the years it doesn't mean that I have special powers okay I'm just a dude 
with a webcam and this bright light and a neon sign and a pudgy penguin toy okay speaking of the memes I told you I only 
have two meme positions that is Pepe and Bon and since I said that Bon has gone on such a ripper it's up 3.1 6X and 
rumor has it it's going to get listed on coinbase again this is proof that the salana ecosystem is absolutely on fire 
okay absolutely on fire heepe I still think is the Daner meme by so many orders of magnitudes hoping that the 
Frog gets its legs under it and has like a Dogecoin moment at some point in the future I don't know I could be wrong 
it's still up a bit here from where I called it only 37% not crazy here but it's up right it's up we don't turn our 
noses up at gains here not after a three-year bare Market we do not turn our noses up at gains even small gains 
now the other thing that is a strategy here and this is so degenerate this is seek medical help degenerate this is you 
need to see a doctor okay you need to see a doctor if you're doing this there's something wrong with you but if 
you do want this level of 100x 200x gains from buying literal abysmal meme coins then what you want to do is look 
for the alternate l1s like Avalanche like Cosmos ecosystem chains and you want to see when they create their 
leading meme coins if you're early to those you could maybe ride on a real rocket ride here and so that's the dgen 
next level stuff is buying meme coins that are not goated like Pepe and Bon those ones are so absurdly risky it's 
not even worth discussing here you really you really just need help you need help you need Jesus next we have the AI Niche and I'm telling you guys my 
main focus here is aosh I have my own validator on aosh so you can delegate to it it's called ELO trades new go ahead 
and delegate towards it I think AOS is doing something that almost nobody is they're allowing for subletting of GPU 
power again AI will continue to make massive news throughout this cycle every few months there's a new AI explosion of 
interest and excitement and drama that will continue driving crazy amounts of attention excitement and investment into 
AI cryptocoins that means that things like AOS which allow you to lease computing power which is the driver of 
AI right now compute power is what this is all about things like aosh will potentially become massive massive 
focuses going forward there's also a bit tensor that's kind of like the leading one I don't have a big bag of it because it literally doesn't know how to dip 
it's just been going absolutely bananas it literally will not dip but I do think that if cool apps start launching on top 
of benser the tow token that could be something to look for again aosh is 
something I've been holding for years I believe they'll continue to crush it and if I were to say so it's my favorite AI 
coin I don't have a ton of AI coins but I do believe Ai and gaming will be the driving narratives of this bull run 
onward if you're looking for a little something extra there's dexes like dydx okay I could see Americans getting 
frustrated not having access to Futures Trading because none of the exchanges let Americans on anymore so 
decentralized Futures like dydx could become interesting again it doesn't pump very hard but I think their new version 
of their protocol which shares fees is quite interesting for me the nft play besides obviously neotokyo and imposters 
the nft play that is most likely to pull a board ape this cycle is pudgy penguins and that's because lucanet the CEO is an 
absolute Beast I'm a friend of his and I think his vision is going to take him somewhere crazy so if there's a next nft 
that is pudgy Penguins you're looking at to me the only thing I see as a pfp project that could hit 100 eth plus I 
think pudgy Penguins would be that crazy one again they've traded as low as 4 eth this year they're up quite a bit but 
they just keep delivering and they recently previewed this pudgy World concept which to me screams that they're 
making a video game and that they will transition from being a consumer packaged Goods project to being a video 
game project which to me is giga bullish cuz gaming to me is the thing I believe in the most most next if we're talking 
about ways that you can enhance your 2024 portfolio you're going to want to look at rotations this is when certain 
ecosystems like salana Ava Cosmos whenever they get hot you'll see the coins within those ecosystems get hot 
again I don't know what those coins are I'm not bringing attention to any of them in specific but let's just say you didn't want to do gaming for some reason 
or you didn't want to do AI you wanted to play in specific ecosystems this is one way to do it I'll end here with 
finally two D5 plays one of which I was an early investor into called Prisma I personally think Prisma will have a 
really nice future again I'm an early investor I plan to hold those tokens for a significant amount of time and see how 
the project performs it's still pretty under the radar as well this is in the liquid staking token narrative where you 
can stake your stake eth and get additional yield on top very interesting project as well as Rune which allows you 
to do onchain swaps between things like ethereum and Bitcoin I think Rune is kind of in its own category so Prisma 
and Rune are the two that I like for defi if I was to pick a defi coin okay 
this Raw video file is now almost an hour and 10 minutes if you guys feel like I delivered a tremendous amount of 
value for this 2024 portfolio overview the way I've gone through and explained why I'm in each one of these coins the 
risk involved the upside the downside the left side the right side then smash that like button and make sure you subscribe with that Bell notification on 
I believe that this is going to be one of the most incredible Cycles we've ever seen but of course there is a risk it doesn't play out if it does however I'm 
confident that gaming will be the most transformative place to be and I'm excited to continue to show you the light throughout this journey if I 
missed your favorite token you know what to do leave me a comment in the comment section below if you enjoyed this video check out this one that I made just a 
few days ago which goes even into more detail on some alt coins that I love as always I'm elot trades and I'll see you 
very soon on the next 
episode 
 `,
  })
); */

/* const data = {

  projects: [
    {
      rpoints: 9,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: ["00:00:06", "00:00:11", "00:01:06"],
      total_count: 3,
      coin_or_project: "Ethereum",
    },
    {
      rpoints: 8,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: ["00:00:06", "00:03:31", "00:04:23"],
      total_count: 3,
      coin_or_project: "Bitcoin",
    },
    {
      rpoints: 8,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: ["00:00:14", "00:18:31", "00:19:19"],
      total_count: 3,
      coin_or_project: "Solana",
    },
    {
      rpoints: 7,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: ["00:00:16", "00:18:32", "00:20:39"],
      total_count: 3,
      coin_or_project: "Cardano",
    },
    {
      rpoints: 7,
      category: ["Meme coins"],
      marketcap: "large",
      timestamps: ["00:18:31", "00:19:25", "00:22:25"],
      total_count: 3,
      coin_or_project: "Dogecoin",
    },
    {
      rpoints: 8,
      category: ["Layer 1", "Gaming"],
      marketcap: "medium",
      timestamps: ["00:18:32", "00:22:08", "00:22:18"],
      total_count: 3,
      coin_or_project: "Avalanche",
    },
    {
      rpoints: 7,
      category: ["DeFi", "Oracle"],
      marketcap: "large",
      timestamps: ["00:18:32", "00:18:38"],
      total_count: 2,
      coin_or_project: "Chainlink",
    },
    {
      rpoints: 8,
      category: ["Layer 1"],
      marketcap: "medium",
      timestamps: ["00:18:37", "00:22:18"],
      total_count: 2,
      coin_or_project: "Sui",
    },
    {
      rpoints: 8,
      category: ["Payments"],
      marketcap: "large",
      timestamps: ["00:18:37", "00:19:18"],
      total_count: 2,
      coin_or_project: "XRP",
    },
    {
      rpoints: 7,
      category: ["Exchange token"],
      marketcap: "large",
      timestamps: ["00:19:36", "00:19:43", "00:19:50"],
      total_count: 3,
      coin_or_project: "Binance Coin",
    },
    {
      rpoints: 8,
      category: ["Layer 1", "AI"],
      marketcap: "medium",
      timestamps: ["00:24:31"],
      total_count: 1,
      coin_or_project: "Near Protocol",
    },
    {
      rpoints: 8,
      category: ["DeFi", "AI"],
      marketcap: "medium",
      timestamps: ["00:24:36"],
      total_count: 1,
      coin_or_project: "Internet Computer",
    },
    {
      rpoints: 8,
      category: ["AI"],
      marketcap: "medium",
      timestamps: ["00:24:37"],
      total_count: 1,
      coin_or_project: "Bittensor",
    },
    {
      rpoints: 8,
      category: ["AI"],
      marketcap: "small",
      timestamps: ["00:24:49"],
      total_count: 1,
      coin_or_project: "AIOZ Network",
    },
    {
      rpoints: 8,
      category: ["AI"],
      marketcap: "small",
      timestamps: ["00:24:53"],
      total_count: 1,
      coin_or_project: "Destra Network",
    },
    {
      rpoints: 8,
      category: ["RWA"],
      marketcap: "small",
      timestamps: ["00:23:25"],
      total_count: 1,
      coin_or_project: "ZIGChain",
    },
    {
      rpoints: 8,
      category: ["RWA"],
      marketcap: "small",
      timestamps: ["00:23:27", "00:23:30"],
      total_count: 2,
      coin_or_project: "PinLink",
    },
  ],
  total_count: 34,
  total_rpoints: 135,
};
function getOffsetTimestamps(timeStamp) {
  const split = timeStamp.split(":");
  const hours = split[0];
  const minutes = split[1];
  const seconds = split[2];
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  totalSeconds = parseInt(totalSeconds);
  const negativeOffset = Math.max(0, totalSeconds - 2);
  const positiveOffset = totalSeconds + 2;
  const negativeOffsetTime = formatTimestamp(negativeOffset);
  const positiveOffsetTime = formatTimestamp(positiveOffset);
  return [negativeOffsetTime, timeStamp, positiveOffsetTime];
}
const timestamps = getOffsetTimestamps(data.projects[0].timestamps[0]);

console.log(`${timestamps[0]}: ${timestamps[1]}:  ${timestamps[2]}`); */

const sampleData = `
00:00:00.160 it's time for my most important video of
00:00:02.440 the year or potentially my most
00:00:04.480 important video for the next four years
00:00:06.839 and that's because today I'm going to be
00:00:08.360 giving you a complete overview of my
00:00:11.120 portfolio for 2024 I'm going to be
00:00:13.920 explaining to you why I'm buying what
00:00:16.000 I'm buying the odds that I see of this
00:00:18.600 bet working out and of course my plan to
00:00:21.640 eventually sell these assets for what I
00:00:23.640 hope will be a life-changing amount of
00:00:25.439 money but it's time to get real here and
00:00:28.039 talk about the brass tax I'm going to be
00:00:30.000 going into the hot narratives gaming AI
00:00:32.960 layer ones and helping you pull apart
00:00:35.280 and understand exactly why I believe
00:00:38.120 these projects are going to win now in
00:00:40.120 December of 2020 I did a similar video
00:00:42.840 and I called out Axie Infinity on
00:00:45.399 December 7th 2020 the price of Axie Infinity was about
00:00:48.120 55 and it went on to Peak here at
00:00:54.199 $160 that my friends is not a 100x that
00:00:57.120 is a
00:00:58.039 300X now beyond that you you know that
00:01:00.559 I've called some of the absolute biggest
00:01:02.640 most face melting gainers of 2023 a year
00:01:06.360 in which most people told us that
00:01:08.320 Bitcoin and all of crypto was going to
00:01:10.320 zero Bitcoin will go to zero and we
00:01:13.479 proved them wrong in fact I do believe
00:01:15.720 that this channel has nailed it more so
00:01:17.799 than almost any other in the entire
00:01:19.640 crypto space but it's time to get real
00:01:21.920 all of this crypto stuff is a massive
00:01:24.400 risk that's why there's the potential
00:01:26.880 upside for literally life-changing gains
00:01:29.280 in the short amount of time when you
00:01:31.360 compare it to any other industry that
00:01:33.159 also means you got to be prepared for
00:01:35.200 that downside even the best projects in
00:01:37.479 this space could crash 70 80 90% in fact
00:01:41.399 some of these projects are so degenerate
00:01:43.159 that you must seek medical help if you
00:01:45.280 want to actually buy them literally the
00:01:47.119 only way you'll be able to view yourself
00:01:48.680 if you lose money here is with clown
00:01:50.799 makeup and a wig so if we're going to do
00:01:52.759 this crypto thing you got to put on your
00:01:54.479 big boy pants you got to take
00:01:56.200 responsibility for each and every coin
00:01:58.520 you buy and most important importantly
00:02:00.119 you have to have a plan why are you
00:02:01.880 buying it what do you believe the
00:02:03.200 valuation for this asset could be and
00:02:05.880 when at what price points will you sell
00:02:08.318 this thing because if you can't answer
00:02:10.000 those questions you are forever going to
00:02:12.040 be fish food to the sharks swimming
00:02:14.239 around you in the crypto waterers now
00:02:16.480 let's talk about the first thing which
00:02:17.920 is why right now is actually really good
00:02:20.400 timing now Bitcoin does this thing where
00:02:22.239 it goes on a four-year cycle it has
00:02:24.280 three good years and then one terrible
00:02:26.000 year the problem is that most people get
00:02:27.840 in when Bitcoin is at the Apex of that
00:02:30.440 one candle they get in at the top when
00:02:32.319 everybody's screaming about crypto how
00:02:34.360 they made all this money Dogecoin
00:02:36.040 Millionaires and so on and so forth the
00:02:38.280 higher Bitcoin and crypto goes in price
00:02:40.159 the more dangerous it is that it could
00:02:42.000 drop in price of course if you flip that
00:02:44.000 around the lower it goes the safer it is
00:02:46.560 to buy and the more likely you are to
00:02:48.159 get the good price close to the bottom
00:02:50.239 and that's why we were buying as soon as
00:02:52.159 we saw some good indications out of the
00:02:54.159 FED when they stepped in and started
00:02:55.879 saving banks in March that's when we
00:02:57.879 hopped in here and said hey look I think
00:02:59.800 think that these bailouts are going to
00:03:01.400 create more liquidity and form a bottom
00:03:03.799 I think the bleed is over and it's time
00:03:05.280 to start allocating even though it feels
00:03:06.920 uncomfortable and it will feel
00:03:08.879 uncomfortable even in these bull runs
00:03:11.080 there are crazy dips as my buddy Alex
00:03:13.720 Becker would say my co-founder in
00:03:15.319 NeoTokyo this is a chart you're going to
00:03:17.159 see everywhere where you see the massive
00:03:19.360 sell-offs that happened all the way up
00:03:21.400 during the 2017 rally the fact is that
00:03:24.000 bull runs are actually the time to buy
00:03:26.239 the dip bare markets are where you sell
00:03:28.879 the rally if you think about it the
00:03:30.560 overall trend is up so you want to buy
00:03:32.760 as it comes down cuz you know it's going
00:03:34.519 to go back up or at least you have a
00:03:36.120 good idea that the trend will continue
00:03:38.680 remember the trend is your friend and
00:03:40.640 the same is true of the bare Market
00:03:42.120 while things are macro going down you
00:03:44.040 want to sell them as they rally up cuz
00:03:45.760 that's your chance to get out at a good
00:03:47.560 price now I wanted to add in here that
00:03:50.200 Bitcoin is now in a dip and the whole
00:03:52.519 Market has pretty much taken a massive
00:03:54.599 dip well not every coin of course Beam
00:03:57.360 and Immutable X are still crushing it
00:03:59.120 but you you know most of the coins here
00:04:01.079 have taken a bit of a dip there's plenty
00:04:02.760 of coins in the red here over the last
00:04:04.319 few days and honestly it's kind of
00:04:06.159 popping up right now so you know it's at
00:04:07.879 42,000 if it gets back above this you
00:04:10.120 know $43,000 Mark or so you know if it
00:04:12.400 gets back Above This 425 or specifically
00:04:15.319 above 43 44 this dip is over right this
00:04:18.320 is going to to new highs for the year
00:04:20.399 what I want to impress upon you is this
00:04:22.280 dips are effectively the thing that you
00:04:24.280 want you don't want to just be chasing
00:04:26.199 when things are up up and away that
00:04:27.800 might feel like the best time to invest
00:04:29.800 it certainly is the most exciting but
00:04:31.479 what you really want to wait for are the
00:04:33.120 times that it's not exciting again so if
00:04:35.320 this dip gets worse goes down into the
00:04:37.160 30s or so maybe even the low3s that
00:04:40.240 would not be the end of times now it
00:04:42.320 would be very concerning if we go below
00:04:44.320 you know 31,000 or 32,000 that is a very
00:04:47.479 sensitive area and might signal a much
00:04:50.320 more difficult time for Bitcoin ahead
00:04:52.680 really all of crypto but in the case of
00:04:55.000 right now anything above 32,000 to me is
00:04:58.240 a massive massive opportunity if it
00:05:00.639 comes down and the more uncomfortable it
00:05:02.759 gets the more the Bears come out of
00:05:04.360 their caves and start screaming it was
00:05:06.280 all a dream this was the biggest bull
00:05:08.039 trap in the history of the world well
00:05:10.199 that to me my friends is the time that
00:05:11.919 all be looking to smash the buy button
00:05:14.039 but again I'm not doing too much right
00:05:15.440 now I've been buying throughout 2023 and
00:05:17.680 so I'm pretty well positioned here
00:05:19.039 coming into 2024 but I hope this video
00:05:21.400 helps you out a lot and back to the
00:05:23.039 analysis so the point is right now we
00:05:25.080 are still in this three candle which is
00:05:27.080 right before the two most parabolic
00:05:29.000 years the two best years of the Bitcoin
00:05:31.440 cycle that is if the cycle is to
00:05:33.520 continue to play out the way it worked
00:05:35.199 before now a lot of people don't believe
00:05:36.840 in this cycle stuff but get this you
00:05:39.199 want to see something crazy from the
00:05:40.880 all-time low in 2015 to the all-time
00:05:43.680 high in 2017 it was exactly
00:05:46.520 1,64 days from the all-time high in 2017
00:05:50.039 to the all-time low in 2018 it was
00:05:52.560 exactly 364 days from all-time low in
00:05:56.319 2018 to alltime high in 2021 1, 64 days
00:06:00.880 again exactly the time from low to high
00:06:04.520 and then once again from all-time high
00:06:06.639 in November of 2021 to alltime low in
00:06:09.400 November of 2022
00:06:12.360 364 days honestly some things are
00:06:15.599 Stranger Than Fiction and Bitcoin very
00:06:17.960 well might be one of those maybe we're
00:06:19.880 all in a simulation maybe this is all
00:06:21.520 some collective delusion maybe there are
00:06:23.599 no coins at all what I do know is that
00:06:25.919 as long as this Bitcoin cycle continues
00:06:27.680 to show itself and prove itself out as
00:06:30.199 it has once again in 2023 I feel like I
00:06:33.479 would be a damn fool not to bet hard on
00:06:37.120 the industry that I log into and talk
00:06:39.680 about and obsess over every single day
00:06:41.800 so that's what I'm doing but make no
00:06:43.680 mistake this is risky business and
00:06:45.840 everything you buy into could be
00:06:47.560 manipulated crash the founders could end
00:06:49.759 up not being honorable or doing the
00:06:51.599 right thing the code could get hacked
00:06:53.680 stuff is very very risky and you assume
00:06:56.599 a 70 to 100% loss whenever you buy
00:06:59.840 anything in this crypto space the
00:07:02.039 trade-off here is you're trading a 70%
00:07:04.360 downside for a potential thousand or
00:07:07.280 10,000% upside that's 10 to 100x upside
00:07:11.160 versus a near total loss those are
00:07:13.400 better odds than you're going to get in
00:07:14.560 Vegas almost any day of the week and for
00:07:16.319 that reason I'm all in on crypto
00:07:18.319 gambling to make my life better and if
00:07:20.319 you're here in crypto right now watching
00:07:21.680 a video like this you need to slam down
00:07:23.879 some hard to swallow pills and
00:07:25.440 understand that you're gambling too well
00:07:27.120 to be fair we all need to gamble that's
00:07:29.080 what the Fiat system forces us to do cuz
00:07:31.240 your money turns to dust in your wallet
00:07:33.319 your labor is not worth anything anymore
00:07:35.199 we need to gamble in stocks in real
00:07:37.000 estate in assets of some kind if you
00:07:39.479 want to get ahead and to me crypto is
00:07:41.599 the one that I know and it's the one
00:07:42.879 that I think is the most generous and
00:07:44.319 most likely to help people Achieve
00:07:46.080 Financial Freedom so I'm gambling here
00:07:47.960 and with that said let's get to my
00:07:49.199 portfolio for 2024 of course we should
00:07:51.520 add that Michael Saylor the biggest bull
00:07:53.080 on Wall Street believes Bitcoin will hit
00:07:54.520 a
00:07:55.479 $350,000 price in 2024 now that would
00:07:58.360 mean that Bitcoin is about 10x from here
00:08:01.159 of course what we saw over the last one
00:08:03.560 was Bitcoin went about 3x over its prior
00:08:06.199 all-time high now if Bitcoin goes to
00:08:07.840 350k that would mean it would do a 5x
00:08:10.360 over its prior all-time high whereas
00:08:12.240 last cycle it did about a 3 and 1/2x
00:08:14.400 over its prior alltime high so it's
00:08:16.120 going way higher and that would mean
00:08:18.039 that what we'd see out of total three
00:08:19.599 meaning the altcoins would probably be
00:08:21.759 even more dramatic right we saw a gain
00:08:24.240 here of total three which went from
00:08:26.280 about 300 billion up to 1.3 trillion
00:08:30.039 this was about a 212% gain or almost a
00:08:32.880 3X out of the altcoins now if we go 50%
00:08:35.519 more that means we could see about a 4X
00:08:37.799 out of the altcoins from prior all-time
00:08:39.958 high and that would mean altcoins alone
00:08:42.200 would be at $4.5 trillion doll not to
00:08:45.040 mention you add in Bitcoin and Ethereum you
00:08:47.200 have crypto scratching its head on
00:08:49.040 nearly $1 trillion in market value that
00:08:52.399 my friends is the size of gold and that
00:08:55.040 my friends is a whole new ball game as
00:08:57.000 they would say and as always I solicited
00:08:58.720 the community I said I'm doing my 2024
00:09:00.800 portfolio video this week what coins
00:09:02.600 should I include and I literally in a
00:09:04.560 few hours got almost 1,000 responses and
00:09:07.839 they were really bad they were terrible
00:09:09.399 I am not taking advice from you guys
00:09:11.200 ever again I don't know what you're
00:09:12.600 trying to do to me but please God stop
00:09:14.760 trying to give me Alpha because it is
00:09:16.079 not working anyway back to the show all
00:09:18.240 right let's get into it this is going to
00:09:19.800 be a complete breakdown of the 2024
00:09:22.360 portfolio and I'm not going to give you
00:09:24.160 exact percentage size of these tokens
00:09:27.000 but I'm going to give you a general idea
00:09:28.800 on how I'm organizing my portfolio as a
00:09:31.160 whole and then I'm going to give you the
00:09:32.920 actual products within each category and
00:09:35.399 this is going to be an absolutely
00:09:36.800 monstrous amount of information so get
00:09:39.560 ready smash that like button and make
00:09:41.519 sure you're subscribed with the Bell
00:09:43.279 notification on each video we've come
00:09:45.680 out with over the past few weeks I've
00:09:47.800 been trying to make sure that they are
00:09:49.120 so loaded with information that they are
00:09:51.760 effectively unmissable okay the first
00:09:54.279 one where we started doing this was 185k
00:09:56.880 views we're going to have our first
00:09:58.200 video Hit 200k K views in what feels
00:10:00.600 like years I'm sure it has been and
00:10:02.600 every single video here I've been
00:10:04.040 pouring my heart and soul into making
00:10:05.519 sure that they are jam-packed with Alpa
00:10:07.640 so make sure you put the Bell
00:10:09.600 notification on because everything I put
00:10:11.880 out on this channel going forward will
00:10:13.560 be in my opinion required viewing you
00:10:16.560 absolutely must watch this stuff if you
00:10:18.640 want to be ahead of crypto no channel is
00:10:21.360 covering these niches and these
00:10:22.920 movements like I am and I'm giving this
00:10:25.160 all to you for free and I'm trying to
00:10:27.200 make sure that I don't waste any of your
00:10:28.720 time here so hit that Bell notification
00:10:31.120 and you will be in my opinion way ahead
00:10:33.760 of everyone else but again as I go
00:10:35.680 through these coins I want to be very
00:10:37.279 clear I will explain my logic as to why
00:10:40.200 I like these coins but in the end this
00:10:42.360 community is getting so big and so many
00:10:44.440 people know about the strength of this
00:10:46.079 community that inevitably if you're
00:10:47.880 following the coins here only on this
00:10:50.000 list then you're always going to be late
00:10:52.000 I want you to take the ideas here the
00:10:54.240 mental models of how I'm finding and
00:10:56.519 analyzing coins in this market which I
00:10:58.440 explained in detail and I want you to
00:11:00.720 apply them on your own and that way you
00:11:02.279 can be ahead instead of buying a
00:11:04.200 YouTuber coin like I'm going to be
00:11:05.839 covering here it's going to allow you to
00:11:07.600 get ahead of everyone else but only if
00:11:10.000 you do these things and do the hard work
00:11:11.480 on your own with that said I hope this
00:11:13.440 information helps you now starting at
00:11:15.279 the top we have Solana okay this is a
00:11:18.399 risk ranking and by the way you see my
00:11:19.760 technicolored risk ranking chart here
00:11:21.399 again this is completely made up right
00:11:23.880 I'm just trying to give you a sense here
00:11:25.200 of where the the bigger risks are uh
00:11:27.720 blue chips and the medium and the medium
00:11:29.560 highs those are just going to be lower
00:11:31.560 gains there's still a ton of risk in
00:11:33.200 those coins right everything has risk in
00:11:35.279 this industry could get sued by the
00:11:37.040 government founder could die you never
00:11:38.880 know crazy world lot of smells Anything
00:11:41.079 Could Happen okay but anyway enough of
00:11:42.720 that Solana you guys know my thesis here
00:11:44.399 Solana is the best competitor to
00:11:46.079 Ethereum and everything in the Solana
00:11:48.560 ecosystem Has Gone Bananas I started
00:11:50.920 giving you guys Solana in the teens in
00:11:53.240 the low 20s and it has absolutely
00:11:55.279 crushed it it peaked I think at about
00:11:56.880 $75 um I'm just calling my ET call here
00:11:59.480 17 though I know I talked about it
00:12:01.079 around the 13 range I just think I was
00:12:02.680 more forceful around the $17 range and
00:12:04.880 so the gains so far are 321 per or 4.21
00:12:08.320 x's and the downside and this is how I'm
00:12:10.959 calculating this the downside is the
00:12:13.440 2023 low so the low value in 2023 I
00:12:17.079 don't think the market goes and revisits
00:12:18.839 those I think that's a hard bottom and
00:12:21.040 so my logic is your downside in this
00:12:23.760 category is effectively the current
00:12:25.320 value and that is divided by the or the
00:12:27.959 the 2023 low divided by the current
00:12:30.480 value and that allows you to see
00:12:32.000 effectively how low you could go if we
00:12:33.600 revisit those lows which is possible
00:12:35.639 right if there's some apocalyptic
00:12:36.959 scenario and Bitcoin just shreds through
00:12:38.720 32k and everything turns out to be a
00:12:41.480 massive bull trap and kappo was right
00:12:44.440 well I guess this is possible right we
00:12:46.199 could go revisit those 2023 lows so I'm
00:12:48.120 just showing you your max downside but
00:12:50.399 just know essentially Solana has taken
00:12:51.839 on this super Blue Chip status as a
00:12:53.600 testament to that projects like gito
00:12:55.519 which are essentially like Lio or Flash
00:12:58.320 Bots in the Solana ecosystem are being
00:13:00.800 valued at multi-billion dollars that's
00:13:02.839 $3 billion fdv for a project like jeto
00:13:06.079 which arguably might be seen as too much
00:13:08.560 too soon but it just shows you how
00:13:10.839 significant the Solana ecosystem is that
00:13:13.079 people are valuing uh the coins in the
00:13:15.199 Solana ecosystem as equal to their
00:13:17.519 Ethereum counterparts and that's a
00:13:18.959 massive narrative so like I said I'll be
00:13:21.199 rotating profits from trades into Solana
00:13:23.920 as part of my strategy and that is one
00:13:25.680 that I keep getting laughed at in the
00:13:26.959 YouTube comments so if you want to keep
00:13:28.480 laughing at me go ahead I appreciate it
00:13:30.720 every time I've been laughed at and
00:13:32.000 mocked for my choices that I'm making
00:13:33.920 publicly here for you all it's turned
00:13:35.839 out to be a massive Money Maker so reply
00:13:38.360 guys eat your heart out because you are
00:13:40.480 my best indicator that I'm doing
00:13:42.040 something right I know it's a hard pill
00:13:43.680 to swallow but we have a lot of coins to
00:13:45.360 get through so we are going to start
00:13:46.680 getting through them the second one is
00:13:47.800 Chainlink again Chainlink is one of
00:13:49.800 the most important protocols in the
00:13:51.560 entire space they're integrating with
00:13:53.839 swift that's right the banking Swift
00:13:56.160 they are one of the most legitimate ways
00:13:58.040 to communicate between chains and
00:14:00.279 protocols if you have dexes that are
00:14:02.360 feeding in prices well they're using an
00:14:04.680 Oracle and that is coming in through
00:14:06.360 Chainlink Chainlink is effectively
00:14:08.240 part of most if not all of Defi and it
00:14:11.560 is a blue chip by all standards again
00:14:14.399 Blue Chips they have a potential for
00:14:16.279 maybe a 10x or so from here maybe a 15x
00:14:19.720 in a very good situation but they're
00:14:22.199 also lower risk they're not going to
00:14:23.959 dump as fast they have much more
00:14:25.639 significant holder bases and Chainlink
00:14:27.680 is definitely a blue Blue Chip to have
00:14:29.680 on your radar it's part of my portfolio
00:14:31.720 and if you want a more passive portfolio
00:14:33.519 things like Solana and Chainlink are
00:14:35.160 definitely in that lower crypto risk
00:14:38.160 almost guaranteed to be here for the
00:14:40.120 next several years if not on into the
00:14:41.920 future next we have coinbase as you know
00:14:43.800 I'm a big bull on coinbase stock after
00:14:46.240 the fall of CZ and FTX they are the last
00:14:48.880 man standing and they are the white
00:14:50.440 knight of crypto publicly listed on the
00:14:52.480 stock market I've been aping coinbase
00:14:54.639 like a madman since about $60 here $65
00:14:58.320 is when I covered it on the channel and
00:15:00.079 that would mean that we're about 2.1x
00:15:02.600 over my call and I keep adding to my
00:15:04.720 coinbase position just cuz it's really
00:15:06.440 easy to do for my bank I have sort of my
00:15:08.680 Fiat and crypto worlds separated and
00:15:11.199 it's a really nice easy thing to do that
00:15:12.880 I've been rotating out of my treasury
00:15:14.360 bills and into coinbase stock largely
00:15:17.160 from my treasury bills and it's been an
00:15:18.639 insane play I also think coinbase is a
00:15:21.519 blue chip in that it's not going to do
00:15:23.000 more than a 10x here in fact if it hits
00:15:25.160 $1,000 I would be kind of mind blown I
00:15:28.120 think that that's possible in like a
00:15:29.759 total blowoff top but really I'm just
00:15:31.759 hoping it makes new highs around $500 to
00:15:33.920 $1,000 at the end of the cycle in 20125
00:15:37.440 that would be a blessing and I think
00:15:39.240 that that is a peak price for coinbase
00:15:41.560 this is the only stock you're going to
00:15:42.600 see here but it trades like a crypto so
00:15:44.399 of course if you want something more
00:15:45.440 passive these are things you can just
00:15:46.880 buy and know they're going to be here
00:15:48.519 years from now and probably going to
00:15:49.720 grow with the cycle now we get into
00:15:51.160 something a little more spicy which is
00:15:52.440 Avalanche as you guys know I've been a
00:15:54.040 big Avalanche bull throughout the years
00:15:56.360 I was first on Avalanche in 2021 one I was
00:15:59.360 one of the first YouTubers to bring Avalanche
00:16:01.399 and the Avalanche ecosystem coins like Joe
00:16:03.920 and some other Crazy Ones to the frame
00:16:05.600 here Joe's like the Uniswap of
00:16:07.839 Avalanche again Avalanche is to me the
00:16:09.920 next in line after Solana as far as
00:16:12.079 hyped layer one ecosystems and it is
00:16:14.720 slightly off of Blue Chip it's not a
00:16:16.120 blue chip it's a medium risk and just to
00:16:18.800 show you here it's been tracking
00:16:20.399 actually the gains of Solana really
00:16:22.199 really well if you look here soul is
00:16:24.360 about 73% off its high Avalanche through
00:16:27.560 most of the markets about 74% off its
00:16:29.720 alltime high it was almost identical in
00:16:32.079 its percent draw down from alltime high
00:16:33.839 for the entirety of the bare market and
00:16:35.759 so these two will probably make their
00:16:37.600 way up to alltime high in a similar
00:16:39.519 fashion and if you really study the
00:16:41.440 actual movements Avalanche is a really
00:16:43.399 interesting evm Tech again the layer one
00:16:46.360 ecosystem has a ton of competition there
00:16:48.519 are so many chains now but I just think
00:16:50.519 there's some muscle memory in the charts
00:16:52.160 here because Solana Luna and Avalanche were
00:16:54.959 like the trio of 2021 obviously Luna
00:16:57.399 nuked and doesn't really exist anymore
00:16:59.199 but Solana and Avalanche when Solana makes a
00:17:01.519 really big run Avalanche seems to want to
00:17:03.120 play catchup and look what is a medium
00:17:05.000 risk goated L1 if you don't have Polygon
00:17:07.839 now Polygon markets itself as a layer
00:17:09.679 two but it really kind of in practice is
00:17:11.640 a layer one though they are starting to
00:17:13.319 connect the dots here with their cdk
00:17:15.439 right so they have this chain
00:17:16.919 development kit where they effectively
00:17:18.439 allow people to launch their own ZK EVMS
00:17:21.119 now this is very next gen and it's in
00:17:23.079 fact the technology that underpins the
00:17:24.959 newest initiative from Immutable X which
00:17:27.119 is of course also on this list and a
00:17:29.280 project that we'll talk about shortly
00:17:31.120 but together this is part of the
00:17:32.840 three-headed dragon of gaming and
00:17:35.320 Polygon is beyond that it's also really
00:17:37.480 good Tech and I know this from my
00:17:39.120 developer friends which throughout 2021
00:17:41.559 really didn't like the technology that
00:17:43.480 underpinned Polygon they've made big
00:17:45.640 strides and in my opinion their ZK Tech
00:17:48.480 has started to become best-in-class and
00:17:50.360 really next gen so it's something to
00:17:52.039 consider that Polygon and their
00:17:53.720 technology keeps evolving and they're
00:17:55.600 about to evolve from the madic token to
00:17:57.679 the pole token
00:17:59.080 again showing their firm transition to
00:18:01.159 ZK rollup technology this is something
00:18:03.880 to keep your eyes on and I have no
00:18:05.360 reason to believe that Polygon won't
00:18:07.400 have a massive run in 2024 with the rest
00:18:10.039 of the market again this thing went on
00:18:11.799 300X it was trading between 1 and 5
00:18:14.400 cents when I was covering it like crazy
00:18:17.080 in 2019 and 2020 and in 2021 it went on
00:18:21.039 its hallowed run up to $3 it's pretty
00:18:24.159 insane next one up is Injective and in
00:18:26.240 this case you want to trust the strength
00:18:27.880 of the chart look at this this is one of
00:18:29.799 the best performing assets of the entire
00:18:32.000 market and one of the few that has
00:18:33.799 actually broken its prior all-time high
00:18:35.840 you can see its prior alltime high was
00:18:37.120 about 24 bucks here and today it is
00:18:39.480 sitting at $26 this is the way that you
00:18:42.400 understand that strength begets strength
00:18:45.000 and obviously we've talked about
00:18:46.159 Injective in fact we were one of the
00:18:47.520 first people to cover Injective at the
00:18:49.080 beginning of the 2021 run at the end of
00:18:51.120 2020 we covered Injective at 70 I
00:18:54.000 actually participated in the early token
00:18:56.640 sale and was able to get tokens at 70
00:18:59.320 here and we rode this thing up as a
00:19:01.080 community up to $22 absolutely
00:19:03.559 astronomical but look it takes a very
00:19:05.960 special type of team to be one of the
00:19:07.440 first to overcome your prior highs in
00:19:09.159 the new cycle and this chart is
00:19:10.960 screaming that it wants to remain strong
00:19:13.120 so again Injective is a defi protocol is
00:19:15.760 part of the Cosmos ecosystem and you'd
00:19:17.760 be a fool to fade this kind of strength
00:19:19.640 in a new cycle next we have Celestia now
00:19:21.960 Celestia is like a nerds Paradise again
00:19:25.240 in the Cosmos ecosystem both of these
00:19:27.280 are they are their own layer ones and
00:19:29.559 again I put them as medium high because
00:19:31.200 they are newer Kids on the Block they
00:19:32.640 are not as established as Avalanche they
00:19:34.320 are not as established as Polygon they
00:19:36.000 do not have as many fundamentals driving
00:19:38.280 them in fact Celestia's brand new and
00:19:40.320 trading like an absolute beast but at
00:19:42.080 the same time I think Celestia's Tech is
00:19:44.360 very exciting to people and the strength
00:19:46.840 of its chart simply cannot be denied I
00:19:49.000 mean essentially it doesn't really know
00:19:50.240 how to take a dip it's absolutely crazy
00:19:52.120 obviously we talked about it here at
00:19:53.480 about four bucks I had people talking to
00:19:55.520 me about it at $2 but I missed that move
00:19:57.880 and as you you can see the strength is
00:19:59.280 just undeniable even when Bitcoin had
00:20:01.039 this dip it just exploded upwards it
00:20:03.080 shows you that there's true demand here
00:20:04.600 for Celestia some additional Alpha here
00:20:06.840 is that I'm hearing that there's going
00:20:07.960 to be a ton of Celestia airdrops so if
00:20:10.280 you're staking Celestia you'll get a ton
00:20:12.120 of these projects that are launching on
00:20:13.480 Celestia essentially giving you free
00:20:15.320 tokens air drops so if you're staking
00:20:16.960 the Tia coin then you could be eligible
00:20:19.200 for some aird drops again this is all
00:20:21.280 early Alpha but in addition they have a
00:20:23.200 16% APR so you stake you get some
00:20:25.840 Celestial rewards and then you get some
00:20:27.559 free tokens on top of it if this thing
00:20:29.559 moons like crazy it could be one of the
00:20:31.919 gigabrain plays of the cycle I'm
00:20:34.280 certainly hoping it is now the last one
00:20:36.159 is Internet Computer and what's crazy
00:20:38.039 about this chart is I don't think I've
00:20:39.080 seen a worst looking chart in my whole
00:20:40.679 life like it is easily the worst looking
00:20:43.200 chart of all charts however that is
00:20:45.640 actually kind of a benefit when you zoom
00:20:47.559 in you realize that almost all their
00:20:49.240 tokens are in market right they have a
00:20:51.120 total supply of 510 they have 450
00:20:53.360 circulating that's like I don't know 80
00:20:54.960 or 90% there and so there's not a lot of
00:20:57.400 inflation and this thing went through
00:20:59.080 this crazy crazy dump where effectively
00:21:01.640 everyone got mad and sold and its
00:21:03.440 reputation went down but meanwhile they
00:21:05.600 kept developing stuff and it's got this
00:21:07.600 decentralized storage play that I
00:21:10.240 actually think makes it slightly
00:21:11.720 different than other layer ones it's not
00:21:13.559 directly competing with the likes of
00:21:15.000 soul and stuff who knows anyway I have
00:21:17.480 some Internet Computer in my portfolio
00:21:19.480 cuz I think there's a chance and if you
00:21:20.960 see here it hasn't pumped very much its
00:21:22.720 low was like three bucks it's up at like
00:21:24.440 5.6 it's not even 2x off its lows and
00:21:27.159 get this the all time high was
00:21:29.000 $700 right it's sitting here at $5
00:21:32.279 that's literally more than 100x it's n
00:21:34.640 it's over 99% down from its all-time
00:21:37.159 high so if it does go back and tickle
00:21:38.880 its all-time high which I think of as
00:21:40.520 absolutely absurd it probably won't do
00:21:42.520 that well it's just like there's just a
00:21:44.279 lot of room for this thing to go that
00:21:45.880 these are the charts that if they get
00:21:47.200 going could mean business if they get
00:21:49.640 serious again I have a very small amount
00:21:51.279 of my portfolio but I figured it was
00:21:53.000 worth a bet in case this thing does wake
00:21:54.960 up next there's a project called monad
00:21:56.840 it is not released yet it's in my uh
00:21:59.480 unreleased and I just gave it a risk
00:22:01.320 because I don't really know what the
00:22:02.240 risk is cuz I don't know what the price
00:22:03.600 is risk is heavily correlated to price
00:22:06.400 if you don't know what the price is you
00:22:07.520 can't determine the risk but anyway this
00:22:09.440 is an upand cominging project that a lot
00:22:11.720 of people are hyped about and I would
00:22:13.559 not be shocked if this thing ends up
00:22:15.919 catching some serious hype waves if we
00:22:18.080 do get this bull run that we're all
00:22:19.559 really hoping for this is one to have on
00:22:21.559 your list definitely go ahead and follow
00:22:23.880 it the next is LayerZero again this is
00:22:26.400 going to be one of the biggest coins in
00:22:27.840 the the whole ecosystem and you can
00:22:29.559 actually likely qualify for their
00:22:31.279 airdrop if you're using their Stargate
00:22:33.760 Finance defi application which allows
00:22:35.840 you to bridge assets between different
00:22:37.840 chains I highly encourage you to
00:22:40.559 understand what LayerZero is as this is
00:22:42.400 likely to be one of the biggest token
00:22:43.679 launches in the whole industry coming up
00:22:45.600 soon shout out to the LayerZero team
00:22:47.400 because I've actually been collaborating
00:22:48.679 with them on some other stuff again
00:22:51.039 stuff that will be announced in 2024 now
00:22:53.279 I want to be clear those are like the
00:22:54.640 big coins those are the big pieces of
00:22:56.400 tech out here that I want you to be
00:22:58.039 aware of and most of those are lowerer
00:22:59.960 risk and we'll have most likely pretty
00:23:01.919 muted rewards we're not talking about
00:23:03.919 100 X's here like if Celestia goes 100x
00:23:06.720 it would be worth like a quad zillion
00:23:08.559 dollars that's not going to happen those
00:23:09.919 are maybe 10 to 20x plays at the max but
00:23:13.600 probably some of them will be closer to
00:23:15.240 5x plays in my opinion having too much
00:23:18.120 of your crypto portfolio tied up in 5x
00:23:20.559 plays feels like a waste that's my
00:23:23.200 particular approach and to explain this
00:23:24.600 in a little more depth I'm breaking out
00:23:26.320 my portfolio breakdown which is in the
00:23:28.720 end I have a lot of money in Treasures
00:23:30.520 which I'm actually rotating quite a bit
00:23:31.720 of money out of there because I believe
00:23:33.279 interest rates have peaked and that risk
00:23:35.240 is going to be the new thing to allocate
00:23:37.039 towards that's my particular approach
00:23:39.200 but in the end I have what's called a
00:23:40.480 crypto barbell where on one side of the
00:23:42.039 barbell I have lower risk stuff stuff I
00:23:44.520 know is going to be there for a very
00:23:46.960 long time stuff like Bitcoin stuff like
00:23:49.000 coinbase stock stuff that I don't need
00:23:51.200 to wake up in the middle of the night
00:23:52.840 sweating and think has it all gone to
00:23:55.000 zero has it all just evaporated into
00:23:57.200 dust yeah yes this is the high
00:23:58.840 conviction long-term bucket and in that
00:24:01.320 high conviction long-term bucket we have
00:24:03.080 Bitcoin we have Ethereum we have Solana
00:24:05.240 and we have coinbase stock and that
00:24:06.919 bucket actually has been updated because
00:24:08.640 coinbase has been ripping Solana has
00:24:10.559 been absolutely ripping and this is how
00:24:12.400 my long-term conviction bucket looks now
00:24:14.760 I'm actually rotating profits whenever I
00:24:16.640 do take them into Solana that's my
00:24:18.400 personal approach again I might rotate
00:24:20.400 profits into some other exotic L1 if I
00:24:22.799 get really carried away but this is my
00:24:24.880 general plan I'm going to try to stick
00:24:26.240 to my plan as much as I can it's also
00:24:28.200 really important to make plans and write
00:24:29.880 them down because the emotion of the
00:24:31.240 market will carry you off into La La
00:24:33.600 Land if you let it and if you write
00:24:35.159 stuff down you can at least sober up for
00:24:37.000 a second and pull yourself out of the
00:24:39.000 Psychedelic Bull Run acid trip that has
00:24:41.760 long since left planet Earth and you're
00:24:44.120 contemplating whether a Dogecoin on
00:24:46.039 butthole chain can be worth $10 trillion
00:24:48.760 because you saw a tick tocker made a Tik
00:24:50.960 Tock about it and you're just wondering
00:24:53.080 what the point of life is because you
00:24:55.000 haven't talked to your friends in months
00:24:56.440 and you stare at a screen all day
00:24:57.720 trading crypto coins that's what the
00:24:59.399 bull Run's like all right you lose your
00:25:01.399 godamn marbles so keep it together all
00:25:03.600 right keep it together and write stuff
00:25:05.399 down all right a little break from the
00:25:06.640 video here because if you're new to
00:25:07.960 crypto you need to have a VPN and that's
00:25:10.559 why I'm extremely proud to partner with
00:25:12.159 nordvpn and be one of their leading
00:25:14.720 Partners in the whole crypto space
00:25:16.399 because if you don't have a VPN you're
00:25:17.960 literally like a lamb to the slaughter
00:25:19.760 here your IP address will start showing
00:25:21.720 up on crypto sites which even though the
00:25:23.760 blockchain is secure those sites could
00:25:25.880 be compromised and your IP address
00:25:28.159 effectively you could become a Target so
00:25:31.039 you want to make sure that you avoid
00:25:32.960 that situation with a product that only
00:25:34.799 cost $3 per month but what's great is
00:25:37.240 you get a massive discount if you use my
00:25:39.360 link below again I was hacked a few
00:25:42.039 months ago and so I take cyber security
00:25:44.760 extremely seriously like I've said many
00:25:47.240 times before you can be forgiven for a
00:25:49.440 lot of mistakes in crypto a lot of them
00:25:51.320 are understandable in fact even ogs make
00:25:53.840 mistakes but one thing you will not be
00:25:55.640 forgiven for is not having a VP VN it's
00:25:58.399 so cheap it's so easy and best of all it
00:26:01.240 supports the channel and I appreciate
00:26:02.760 you guys so check out nordvpn sponsor of
00:26:04.880 today's video and let's get back to some
00:26:06.919 good old fashion cryptocoins back to the
00:26:08.880 point here I personally think that the
00:26:10.679 zero Infinity bucket is worth allocating
00:26:13.159 to now I personally think the zero
00:26:15.159 Infinity bucket has odds that in a bull
00:26:17.840 run make sense because in a bull run if
00:26:20.200 Bitcoin continues to grow usually
00:26:22.440 altcoins will continue to grow
00:26:24.720 especially early on in the bull run and
00:26:27.159 quite Frank Al the risk if Bitcoin
00:26:28.919 doesn't continue to grow is it could
00:26:30.760 drop dramatically I mean bitcoin's up 3x
00:26:33.200 on the year so I mean the thing could
00:26:34.840 drop like 70% and still only be touching
00:26:38.399 its 2023 low that my friends is a huge
00:26:41.960 amount of downside but if you're upside
00:26:44.120 is you know somewhat limited compared to
00:26:46.440 the 100x opportunities out there and
00:26:48.600 those 100x opportunities are likely to
00:26:51.200 hold and grow if Bitcoin holds and grows
00:26:53.880 then to me the crazy Bull Run logic is
00:26:56.240 you want to be allocated in some way to
00:26:58.679 these altcoins the zero Infinity bucket
00:27:00.840 knowing that it goes to zero or the damn
00:27:02.360 Moon and you're comfortable with the
00:27:04.000 odds of it doing one or the other and
00:27:06.000 you're ready for either outcome that's
00:27:07.640 where I'm at again make your own
00:27:09.159 decisions I have enough fiat currency I
00:27:11.360 have enough cash in my world that if my
00:27:13.559 crypto goes to zero I'll keep eating
00:27:15.440 I'll keep surviving and my life won't be
00:27:17.360 changed obviously it would suck ass but
00:27:20.000 I would still continue to live and
00:27:21.880 survive and pay rent a lot of people
00:27:23.720 aren't in that same boat so you have to
00:27:25.440 make the decisions based on your own
00:27:27.080 Financial decisions I'm not going to be
00:27:29.000 there to pay your rent or to feed your
00:27:31.120 kids if you can't do it you got to take
00:27:32.880 care of your own period okay so
00:27:35.600 let's get to the fun stuff okay Beam
00:27:37.480 Merit Circle again they were called
00:27:39.039 Merit Circle I covered them at about 40
00:27:41.440 cents and they've shot up here to what
00:27:44.159 was the equivalent of $2 but when they
00:27:46.240 did a 1 to 100 split on Beam now the
00:27:48.640 price is reflected you can think of this
00:27:50.240 as 0.0043 or something like that so
00:27:52.679 they've done about a 4.4x since I
00:27:54.480 covered them absolutely smoking those
00:27:56.760 gains and they are one of the most
00:27:58.360 important coins in the crypto gaming
00:28:00.720 space they have a ton of Investments
00:28:02.720 they have a treasury of nearly $100
00:28:04.679 million they are actively invested in
00:28:06.919 some of the best games in the space and
00:28:09.080 they are now partnered with Immutable X
00:28:10.840 to bring some cool technology to the
00:28:12.919 Immutable X ZK evm speaking of Immutable
00:28:15.600 X they are also on this list as you know
00:28:17.720 I an Immutable X seed investor I'm a
00:28:19.880 massive investor in Beam and I have huge
00:28:22.760 huge bags of both of these tokens and I
00:28:25.440 am so happy to see them climbing the
00:28:27.480 ranks with absolutely Reckless abandon
00:28:29.960 here and I have no reason to doubt that
00:28:32.240 they will continue to grow as gaming
00:28:34.080 continues to grow my hope is that
00:28:36.519 Immutable X becomes the first gaming
00:28:38.519 token to crack the top 10 in crypto
00:28:41.320 market caps and just for some
00:28:42.919 perspective here it's at $2.6 billion
00:28:45.399 market cap the top 10 is 13 here so it
00:28:49.279 would have to five or 6 x from here to
00:28:52.360 overcome the Dogecoin and to me that would
00:28:54.840 have to do that you know against the
00:28:56.320 market so this would take take a massive
00:28:58.279 gaming run but I don't think it's insane
00:29:00.320 I think it might happen here and if it
00:29:02.320 does happen then that might mean that
00:29:04.399 Beam becomes a top 25 coin or something
00:29:07.200 like that again understanding that
00:29:08.919 crypto is about categories niches
00:29:11.720 storylines and if one coin from a
00:29:13.559 category makes it astronomically High
00:29:15.720 the entire category will reprice under
00:29:17.919 it so the higher Immutable X goes that
00:29:20.080 creates a higher ceiling for the rest of
00:29:21.679 the gaming ecosystem to flourish in so
00:29:24.000 as a massive gaming bull I'm very
00:29:26.080 excited that Immutable X is continuing
00:29:28.000 to crush on the way up and that to me
00:29:30.480 paves the way it blazes a trail for all
00:29:32.720 of gaming to repic under it so as you
00:29:34.840 see a mutable X make this massive run
00:29:37.200 know that it's bullish for all of gaming
00:29:39.559 that's the facts Gala as we've said they
00:29:41.799 are a publisher they have several games
00:29:43.880 and they had a massive destructive run
00:29:46.360 down from their all-time high their
00:29:47.960 all-time high was like 70 cents they're
00:29:50.039 currently at three here so on their way
00:29:52.159 back up if they are to make it back up
00:29:53.919 could do astronomical gains again their
00:29:56.159 downside is about 60% % they haven't
00:29:57.880 pumped too hard here as you can see
00:29:59.480 these other ones have pumped much harder
00:30:01.039 they're up much more significantly but
00:30:03.080 about 2.1x since we called it here on
00:30:05.679 the channel Ronin again similar to Gala
00:30:08.200 they have some games far less games here
00:30:10.279 like Immutable X has like hundreds of
00:30:12.000 games that are coming to the Immutable
00:30:13.760 Xchain but Ronin has Axie Infinity which
00:30:16.240 was the most successful crypto game of
00:30:18.200 all time and they also have now pixels
00:30:20.279 online which has 400,000 active users
00:30:23.320 now the thing about the Ronin ecosystem
00:30:25.080 is it caters largely they have a huge
00:30:26.919 fill Lino player base and so there's a
00:30:29.200 lot of emerging economy Dynamics going
00:30:31.240 on there but it is a very interesting
00:30:33.159 and totally unique way to approach
00:30:35.039 gaming and again there's a lot of
00:30:36.679 different approaches here I'm not
00:30:38.279 playing gatekeeper I'm just saying
00:30:40.200 here's all the pieces and as you can see
00:30:42.039 Ronin has performed pretty well of about
00:30:44.159 3.4x since we covered on the channel and
00:30:46.399 that has a lot I think to do with pixels
00:30:48.159 online which is this game that has a ton
00:30:50.240 of active users right now again very few
00:30:52.640 games on Ronin there's a few games on
00:30:54.559 Gala there's quite a few games that are
00:30:56.159 connected with Beam actually launching
00:30:57.679 on it subnet as well as dozens and
00:30:59.799 dozens of Investments by the Merit
00:31:01.840 Circle Dow and then you have a mutable X
00:31:04.080 which is kind of like the big daddy
00:31:05.240 gaming coin which we hope hope breaks
00:31:07.159 into the top 10 next we have cify as you
00:31:09.200 know cify is a Launchpad these
00:31:11.440 launchpads as the market gets super hot
00:31:13.880 again if we are to get this Raging Bull
00:31:15.480 Market launchpads will go bananas they
00:31:17.480 will go absolutely crazy because they
00:31:19.960 will give you early access to tokens
00:31:21.880 before they hit the market and token
00:31:23.559 launches in a bull market can go
00:31:25.200 absolutely dummy High I'm talking 10 20
00:31:28.840 50 100x 200x and more in the peak heat
00:31:33.279 of the bull market and so if you get
00:31:34.760 into the launch pads you can actually
00:31:36.720 buy allocations to these new projects
00:31:39.559 sometimes just 500 bucks sometimes a few
00:31:41.440 thousand doll but if things go 20x 50x
00:31:45.000 and you instantly have those tokens you
00:31:47.440 can flip and make 20K 50k sometimes even
00:31:50.760 more in single days and that is the
00:31:53.440 magic of launchpads but it only works
00:31:55.600 during Peak bowl season so again cify is
00:31:57.960 kind of the leading gaming Launchpad I
00:31:59.960 have a ton of cify tokens I cover them
00:32:02.440 first at 60 cents here and so you're
00:32:04.240 looking at almost a 6X since I covered
00:32:06.880 them again you are welcome team elot
00:32:09.720 trades if you guys have been rocking
00:32:10.799 with the channel here in 2023 you know
00:32:13.240 this has been probably the best content
00:32:15.159 streak I've ever been on and I only
00:32:17.120 intend to keep pushing harder because
00:32:19.120 getting bullish early in the cycle is
00:32:21.519 lower risk whereas getting bullish at
00:32:23.399 the ultimate Peak is the higher risk and
00:32:26.279 I personally hope I can get the most
00:32:27.559 amount of people excited about this
00:32:29.159 Market at an early stage when most coins
00:32:32.080 are probably going to do well as opposed
00:32:33.919 to at the end of a cycle when most coins
00:32:36.519 are set up to absolutely implode that is
00:32:39.919 the best way to do it and I hope this
00:32:42.080 content helps the maximum amount of
00:32:44.000 people but again it's not a team sport
00:32:45.799 here you all got to understand it is you
00:32:48.559 and you alone out there in the crypto
00:32:50.240 markets once you choose to buy some
00:32:52.120 coins next we got Prime again this is
00:32:54.639 one of the most legit trading card games
00:32:57.039 here in the space you have a $119 2023
00:32:59.999 low and uh their their current value is
00:33:02.679 almost 9 bucks these guys are backed by
00:33:04.600 a16z they're super duper legit and in my
00:33:07.760 opinion this could be one of the highest
00:33:09.799 performing gaming tokens of the cycle
00:33:11.760 I'm definitely a big fan of what they're
00:33:13.360 doing here and I hope hope they continue
00:33:15.480 to crush it as you can see their fully
00:33:17.279 diluted valuation here is almost a
00:33:19.120 billion so they only have you know small
00:33:21.080 amount of their token circulating like
00:33:22.639 less than 30% of their token circulating
00:33:24.679 so it really is a tiny uh circulating
00:33:26.760 Market market cap and there will be
00:33:28.200 token emissions here something to
00:33:29.840 consider but they are one of the most
00:33:31.279 advanced ecosystems and they definitely
00:33:32.960 deserve a slot in anyone's gaming
00:33:34.440 portfolio once again my philosophy on
00:33:36.799 gaming is that it will eventually create
00:33:39.240 mainstream hits the industry will
00:33:41.080 continue to have some of the most
00:33:42.679 attention and excitement surrounding it
00:33:44.720 and when anything succeeds in gaming the
00:33:46.840 rest of the tokens will get a lot of
00:33:48.159 love so that's why I'm hyperfocused on
00:33:50.200 gaming because as a niche I'm convinced
00:33:52.080 it's going to succeed and its success
00:33:54.360 will mean that focusing and distributing
00:33:56.159 my bets within that niche in my opinion
00:33:58.159 are most likely to succeed next we have
00:34:00.360 NeoTokyo now this is a project that is
00:34:02.200 mine obviously there are three projects
00:34:03.720 here that I have founded and I cannot
00:34:06.120 comment on for that reason I cannot tell
00:34:08.320 you how risky they are or talk about
00:34:10.359 prices or anything like that as a
00:34:12.199 Founder but what I can tell you is that
00:34:13.800 NeoTokyo has almost certainly fulfilled
00:34:16.440 its highest aspiration of becoming the
00:34:18.960 crypto gaming Illuminati the networking
00:34:21.399 Club where the power Brokers of crypto
00:34:23.480 gaming come to intermingle to share
00:34:25.800 knowledge to build to launch stuff and
00:34:28.480 that's why tons of projects want to
00:34:30.079 actually launch to the NeoTokyo holders
00:34:32.520 in this case Immutable Immutable X has
00:34:34.440 recently joined literally every gaming
00:34:36.560 project here is a part of NeoTokyo
00:34:38.879 almost and it is very much so the place
00:34:41.399 to be if you are a power broker in
00:34:43.359 crypto gaming community members have
00:34:45.199 created all kinds of projects one
00:34:47.359 Community member actually created a
00:34:48.918 Launchpad again this is not owned or
00:34:51.079 controlled in any way by NeoTokyo or me
00:34:53.079 or Becker but like cify someone created
00:34:55.839 a Launchpad so that citizens could get
00:34:57.640 access to projects before they launch
00:34:59.359 and projects often times choose to want
00:35:01.839 to come to NeoTokyo because they want
00:35:03.960 these holders these Diamond hands these
00:35:05.880 power Brokers to be a part of their
00:35:07.720 projects and that's why NeoTokyo has
00:35:09.400 been so successful is it is an
00:35:11.000 absolutely phenomenal experiment that
00:35:12.880 has succeeded in every way of becoming
00:35:14.640 the networking Club of web 3 gaming now
00:35:17.119 imposters is the game of the SuperVerse
00:35:19.440 now I do want to be very clear the best
00:35:21.839 advice I can give you is to go put the
00:35:24.000 Bell notification on for SuperVerse just
00:35:26.520 like this make sure that it's turned on
00:35:29.400 because SuperVerse will be shedding its
00:35:31.440 skin and revealing an entirely new phase
00:35:34.000 of the project that is very much so the
00:35:36.000 connecting fiber between everything that
00:35:38.680 you see in front of you in the crypto
00:35:40.599 gaming space there is no doubt that this
00:35:42.640 community is the biggest and most
00:35:44.560 powerful in the crypto gaming space I've
00:35:46.839 been spreading the good word about
00:35:48.359 crypto gaming since 2018 I don't want to
00:35:51.400 ruin this reveal because we've been
00:35:53.040 working really hard on it but all I can
00:35:54.280 say is turn post notifications on on
00:35:56.079 SuperVerse and understand that as hard
00:35:58.599 as you see me working on content as much
00:36:00.640 as you see me getting ahead of these
00:36:01.960 Trends in the industry year after year
00:36:04.400 week after week month after month year
00:36:06.359 after year cycle after cycle I'm putting
00:36:09.079 far more effort orders of magnitude more
00:36:11.200 into these projects and you'll soon see
00:36:12.839 the fruits of those labors now to be
00:36:14.520 clear imposters is currently an nft form
00:36:17.680 and the studio behind Impostors has
00:36:19.720 recently hired an absolute legend in the
00:36:22.319 form of Rick Ellis I highly encourage
00:36:24.680 you to watch this interview where Rick
00:36:26.520 Ellis list the new head of imposters
00:36:28.640 actually explains why he's so bullish on
00:36:30.640 web 3 gaming and his plan to take
00:36:32.520 imposters mainstream again these
00:36:34.359 projects are my primary focus and if you
00:36:36.720 believe in what I'm doing then all I ask
00:36:38.640 you to do is turn your notifications on
00:36:40.560 for those projects because there is a
00:36:42.440 lot coming in 2024 that you cannot see
00:36:45.000 and if I'm right about this crypto cycle
00:36:47.160 being the one which crypto gaming breaks
00:36:49.040 through to the mainstream well there's a
00:36:50.800 whole lot in store for these projects
00:36:52.200 that you can't even imagine next this is
00:36:54.280 actually the first project that I'm
00:36:55.359 going to put on here that's unreleased
00:36:57.000 this is called terse and when it comes
00:36:58.680 to unreleased projects I want to be
00:36:59.920 completely clear the hype before the
00:37:01.960 release is totally damaging to the
00:37:04.079 project and you do not if you're not one
00:37:06.200 of the early investors you do not want
00:37:08.040 to be buying these projects right out of
00:37:09.760 the gate almost all new token projects
00:37:12.000 during the Bull Run come out at
00:37:13.720 astronomical prices they tend to pump
00:37:15.960 and dump and you want to kind of stay
00:37:17.760 away from them until they dump like
00:37:19.560 crazy but again that depends on when
00:37:21.400 they come out and when the tokens
00:37:22.599 release but I will for your
00:37:24.520 understanding just put these on your
00:37:25.880 radar and I'm not going to talk too much
00:37:27.319 about them cuz I don't want to create
00:37:28.480 any artificial hype about them but I
00:37:30.520 just want you to know that these are
00:37:31.640 projects that are coming next year that
00:37:33.160 I think are ones you should be
00:37:34.200 researching and understanding token
00:37:36.400 launches are very very tumultuous and
00:37:39.040 you should definitely be careful when
00:37:40.560 you get into any new token and
00:37:42.400 understand the 360 view R rever gonzilla
00:37:45.200 ready games pixels online and I'll also
00:37:48.000 add in Heroes of Mavia here again these
00:37:50.040 are all super highquality gaming
00:37:51.640 projects I've invested into most of them
00:37:53.839 not all of them and again I'll follow up
00:37:55.800 with more information when the time is
00:37:57.079 relevant but I'm making a 2024 video I
00:37:59.560 want you guys to know what I'm thinking
00:38:00.760 about for 2024 next we have shrapnel
00:38:03.200 shrapnel is one of the hottest gaming
00:38:05.040 tokens they have one of the sickest
00:38:06.800 looking games they're competing in the
00:38:08.359 Big Show which is firstperson Shooters
00:38:10.240 they have their own subnet on Avalanche
00:38:12.200 I certainly certainly hope that they
00:38:13.680 succeed in their mission again any game
00:38:15.480 succeeding is good for all of the games
00:38:17.400 and I'm very hyped on what they're doing
00:38:19.280 definitely part of my 20124 portfolio
00:38:22.200 next big time again I never put calls on
00:38:24.160 trapal big time so I just have na here
00:38:26.040 but again big time and trapnel are two
00:38:28.200 of the best looking games in the
00:38:29.640 industry right now big time is one that
00:38:31.560 is very interesting because if you're
00:38:33.440 actually farming within the game you can
00:38:35.440 play an MMO RPG and players are making
00:38:38.119 up to six figures over the last few
00:38:40.400 months farming their big time tokens it
00:38:42.599 is something that probably won't last
00:38:43.960 forever so if you're looking to spend
00:38:45.760 some time and grind a game and maybe end
00:38:47.680 up earning some crazy amounts of tokens
00:38:49.520 I highly suggest you check out big time
00:38:52.000 and of course we have cus again I've
00:38:53.920 covered cus in depth they're adding a
00:38:56.000 LaunchPad had they burnt a ton of their
00:38:58.079 supply they have tons of games in their
00:39:00.119 ecosystem and they are up almost 10 full
00:39:03.079 X's since we covered them here on the
00:39:05.040 channel absolutely Smokey no jokey gains
00:39:08.359 here out of cus their goal is to focus
00:39:10.560 on browser gameplay totally democratized
00:39:13.599 no fancy chips required and they believe
00:39:15.720 that the Casual gaming route is the way
00:39:17.160 to onboard billions of users again
00:39:19.160 everyone has their own strategy some
00:39:20.880 games are going for immersive AAA like
00:39:23.000 you're seeing with gonzilla like you're
00:39:24.240 seeing with shrapnel like you're seeing
00:39:25.640 with eluvium another one that's on my
00:39:27.560 list for 2024 I don't know why it's not
00:39:29.520 here some are going for more casual
00:39:31.040 games like cus mobile games like Mavia
00:39:33.359 or wagi and then you also have more
00:39:35.680 economic games like you saw out of Axie
00:39:37.640 Infinity and you're seeing the same
00:39:39.119 thing out of pixels online next I'm just
00:39:41.200 going to be real this risk rating again
00:39:43.200 the risk rating for all the ones in
00:39:44.440 yellow is high that means you know you
00:39:46.240 could have a 20 to 50x but you could see
00:39:48.440 a 90% correction this is big big risk
00:39:51.880 right the medium highs you're seeing
00:39:53.599 maybe a 15x or an 80% correction medium
00:39:56.560 you have a 75% correction and a 12x you
00:39:58.960 just have to understand the risk scale
00:40:00.680 here and again this is not very sciency
00:40:02.839 I just literally pulled these numbers
00:40:04.119 out again this is like astrology for men
00:40:06.319 here embrace it we're just looking to
00:40:08.040 the stars but we're hoping that we get
00:40:09.599 something right I've caught a lot right
00:40:11.079 over the years it doesn't mean that I
00:40:12.720 have special powers okay I'm just a dude
00:40:15.040 with a webcam and this bright light and
00:40:17.359 a neon sign and a pudgy penguin toy okay
00:40:20.000 speaking of the memes I told you I only
00:40:21.560 have two meme positions that is Pepe and
00:40:23.400 Bon and since I said that Bon has gone
00:40:25.240 on such a ripper it's up 3.1 6X and
00:40:29.160 rumor has it it's going to get listed on
00:40:30.640 coinbase again this is proof that the
00:40:32.760 Solana ecosystem is absolutely on fire
00:40:35.640 okay absolutely on fire heepe I still
00:40:38.319 think is the Daner meme by so many
00:40:40.079 orders of magnitudes hoping that the
00:40:41.599 Frog gets its legs under it and has like
00:40:43.440 a Dogecoin moment at some point in the
00:40:45.200 future I don't know I could be wrong
00:40:46.839 it's still up a bit here from where I
00:40:48.920 called it only 37% not crazy here but
00:40:51.800 it's up right it's up we don't turn our
00:40:53.520 noses up at gains here not after a
00:40:55.359 three-year bare Market we do not turn
00:40:57.280 our noses up at gains even small gains
00:40:59.240 now the other thing that is a strategy
00:41:00.680 here and this is so degenerate this is
00:41:02.520 seek medical help degenerate this is you
00:41:04.520 need to see a doctor okay you need to
00:41:07.240 see a doctor if you're doing this
00:41:09.280 there's something wrong with you but if
00:41:10.560 you do want this level of 100x 200x
00:41:12.880 gains from buying literal abysmal meme
00:41:15.280 coins then what you want to do is look
00:41:17.040 for the alternate l1s like Avalanche
00:41:19.839 like Cosmos ecosystem chains and you
00:41:21.920 want to see when they create their
00:41:23.640 leading meme coins if you're early to
00:41:25.760 those you could maybe ride on a real
00:41:27.720 rocket ride here and so that's the dgen
00:41:30.319 next level stuff is buying meme coins
00:41:32.160 that are not goated like Pepe and Bon
00:41:34.319 those ones are so absurdly risky it's
00:41:35.880 not even worth discussing here you
00:41:37.640 really you really just need help you
00:41:38.920 need help you need Jesus next we have
00:41:40.720 the AI Niche and I'm telling you guys my
00:41:42.760 main focus here is AIOZ I have my own
00:41:44.920 validator on AIOZ so you can delegate to
00:41:46.839 it it's called ELO trades new go ahead
00:41:49.160 and delegate towards it I think AIOZ is
00:41:51.480 doing something that almost nobody is
00:41:53.400 they're allowing for subletting of GPU
00:41:55.880 power again AI will continue to make
00:41:58.520 massive news throughout this cycle every
00:42:00.400 few months there's a new AI explosion of
00:42:02.839 interest and excitement and drama that
00:42:04.680 will continue driving crazy amounts of
00:42:06.640 attention excitement and investment into
00:42:09.440 AI cryptocoins that means that things
00:42:11.599 like AIOZ which allow you to lease
00:42:13.760 computing power which is the driver of
00:42:15.920 AI right now compute power is what this
00:42:18.040 is all about things like AIOZ will
00:42:20.400 potentially become massive massive
00:42:22.559 focuses going forward there's also Bittensor that's kind of like the leading
00:42:24.480 one I don't have a big bag of it because
00:42:26.839 it literally doesn't know how to dip
00:42:28.720 it's just been going absolutely bananas
00:42:30.480 it literally will not dip but I do think
00:42:32.640 that if cool apps start launching on top
00:42:34.920 of Bittensor the Bittensor token that could be
00:42:37.559 something to look for again AIOZ is
00:42:39.960 something I've been holding for years I
00:42:41.720 believe they'll continue to crush it and
00:42:43.359 if I were to say so it's my favorite AI
00:42:45.359 coin I don't have a ton of AI coins but
00:42:47.200 I do believe Ai and gaming will be the
00:42:48.880 driving narratives of this bull run
00:42:50.760 onward if you're looking for a little
00:42:52.079 something extra there's dexes like dYdX
00:42:54.800 okay I could see Americans getting
00:42:56.240 frustrated not having access to Futures
00:42:58.520 Trading because none of the exchanges
00:43:00.520 let Americans on anymore so
00:43:01.880 decentralized Futures like dYdX could
00:43:04.240 become interesting again it doesn't pump
00:43:05.839 very hard but I think their new version
00:43:07.359 of their protocol which shares fees is
00:43:08.880 quite interesting for me the nft play
00:43:11.680 besides obviously NeoTokyo and imposters
00:43:14.040 the nft play that is most likely to pull
00:43:16.359 a board ape this cycle is Pudgy Penguins
00:43:18.880 and that's because lucanet the CEO is an
00:43:21.480 absolute Beast I'm a friend of his and I
00:43:23.720 think his vision is going to take him
00:43:25.359 somewhere crazy so if there's a next nft
00:43:27.960 that is Pudgy Penguins you're looking at
00:43:29.680 to me the only thing I see as a pfp
00:43:32.599 project that could hit 100 eth plus I
00:43:34.559 think Pudgy Penguins would be that crazy
00:43:36.319 one again they've traded as low as 4 eth
00:43:38.480 this year they're up quite a bit but
00:43:40.440 they just keep delivering and they
00:43:41.839 recently previewed this pudgy World
00:43:43.599 concept which to me screams that they're
00:43:45.800 making a video game and that they will
00:43:47.720 transition from being a consumer
00:43:49.559 packaged Goods project to being a video
00:43:51.720 game project which to me is giga bullish
00:43:54.119 cuz gaming to me is the thing I believe
00:43:55.720 in the most most next if we're talking
00:43:57.240 about ways that you can enhance your
00:43:58.839 2024 portfolio you're going to want to
00:44:00.680 look at rotations this is when certain
00:44:02.520 ecosystems like Solana Avalanche Cosmos
00:44:04.920 whenever they get hot you'll see the
00:44:06.319 coins within those ecosystems get hot
00:44:08.520 again I don't know what those coins are
00:44:10.040 I'm not bringing attention to any of
00:44:11.280 them in specific but let's just say you
00:44:13.280 didn't want to do gaming for some reason
00:44:14.920 or you didn't want to do AI you wanted
00:44:16.640 to play in specific ecosystems this is
00:44:18.920 one way to do it I'll end here with
00:44:20.440 finally two Defi plays one of which I was
00:44:22.599 an early investor into called Prisma I
00:44:24.839 personally think Prisma will have a
00:44:26.440 really nice future again I'm an early
00:44:28.400 investor I plan to hold those tokens for
00:44:30.160 a significant amount of time and see how
00:44:31.720 the project performs it's still pretty
00:44:33.760 under the radar as well this is in the
00:44:35.839 liquid staking token narrative where you
00:44:38.079 can stake your stake eth and get
00:44:40.200 additional yield on top very interesting
00:44:42.359 project as well as THORChain which allows you
00:44:44.000 to do onchain swaps between things like
00:44:45.760 Ethereum and Bitcoin I think THORChain is
00:44:47.920 kind of in its own category so Prisma
00:44:50.000 and THORChain are the two that I like for
00:44:52.160 defi if I was to pick a defi coin okay
00:44:55.440 this Raw video file is now almost an
00:44:57.040 hour and 10 minutes if you guys feel
00:44:59.280 like I delivered a tremendous amount of
00:45:01.160 value for this 2024 portfolio overview
00:45:04.000 the way I've gone through and explained
00:45:05.480 why I'm in each one of these coins the
00:45:07.280 risk involved the upside the downside
00:45:09.240 the left side the right side then smash
00:45:10.880 that like button and make sure you
00:45:12.040 subscribe with that Bell notification on
00:45:14.040 I believe that this is going to be one
00:45:15.280 of the most incredible Cycles we've ever
00:45:17.000 seen but of course there is a risk it
00:45:18.960 doesn't play out if it does however I'm
00:45:21.040 confident that gaming will be the most
00:45:22.680 transformative place to be and I'm
00:45:24.440 excited to continue to show you the
00:45:26.000 light throughout this journey if I
00:45:27.359 missed your favorite token you know what
00:45:28.559 to do leave me a comment in the comment
00:45:29.920 section below if you enjoyed this video
00:45:31.599 check out this one that I made just a
00:45:33.240 few days ago which goes even into more
00:45:35.559 detail on some alt coins that I love as
00:45:37.960 always I'm elot trades and I'll see you
00:45:39.680 very soon on the next
00:45:50.280 episode
`;
const data = {
  projects: [
    {
      coin_or_project: "Bitcoin",
      Marketcap: "large",
      Rpoints: 9,
      "Total count": 3,
      category: ["DeFi", "Layer 1"],
      Timestamps: ["00:01:08", "00:02:22", "00:04:07"],
    },
    {
      coin_or_project: "Axie Infinity",
      Marketcap: "medium",
      Rpoints: 8,
      "Total count": 2,
      category: ["Gaming"],
      Timestamps: ["00:00:42", "00:30:16"],
    },
    {
      coin_or_project: "Dogecoin",
      Marketcap: "large",
      Rpoints: 7,
      "Total count": 2,
      category: ["Meme coins"],
      Timestamps: ["00:02:36", "00:28:54"],
    },
    {
      coin_or_project: "Solana",
      Marketcap: "large",
      Rpoints: 9,
      "Total count": 3,
      category: ["Layer 1"],
      Timestamps: ["00:11:15", "00:11:44", "00:27:32"],
    },
    {
      coin_or_project: "Chainlink",
      Marketcap: "large",
      Rpoints: 10,
      "Total count": 2,
      category: ["DeFi"],
      Timestamps: ["00:13:47", "00:14:08"],
    },
    {
      coin_or_project: "Ethereum",
      Marketcap: "large",
      Rpoints: 9,
      "Total count": 3,
      category: ["Layer 1", "DeFi"],
      Timestamps: ["00:08:47", "00:11:46", "00:16:07"],
    },
    {
      coin_or_project: "Avalanche",
      Marketcap: "large",
      Rpoints: 8,
      "Total count": 3,
      category: ["Layer 1", "Gaming"],
      Timestamps: ["00:15:52", "00:16:01", "00:41:19"],
    },
    {
      coin_or_project: "Polygon",
      Marketcap: "large",
      Rpoints: 8,
      "Total count": 2,
      category: ["Layer 2"],
      Timestamps: ["00:17:07", "00:18:03"],
    },
    {
      coin_or_project: "Injective",
      Marketcap: "medium",
      Rpoints: 9,
      "Total count": 2,
      category: ["DeFi"],
      Timestamps: ["00:18:26", "00:18:46"],
    },
    {
      coin_or_project: "Celestia",
      Marketcap: "medium",
      Rpoints: 9,
      "Total count": 2,
      category: ["Layer 1"],
      Timestamps: ["00:19:21", "00:19:53"],
    },
    {
      coin_or_project: "Internet Computer",
      Marketcap: "medium",
      Rpoints: 7,
      "Total count": 2,
      category: ["Layer 1"],
      Timestamps: ["00:20:36", "00:21:17"],
    },
    {
      coin_or_project: "Monad",
      Marketcap: "small",
      Rpoints: 8,
      "Total count": 1,
      category: ["Layer 1"],
      Timestamps: ["00:21:56"],
    },
    {
      coin_or_project: "LayerZero",
      Marketcap: "medium",
      Rpoints: 9,
      "Total count": 1,
      category: ["DeFi"],
      Timestamps: ["00:22:26"],
    },
    {
      coin_or_project: "Beam",
      Marketcap: "small",
      Rpoints: 9,
      "Total count": 2,
      category: ["Gaming"],
      Timestamps: ["00:27:37", "00:28:09"],
    },
    {
      coin_or_project: "Merit Circle",
      Marketcap: "small",
      Rpoints: 9,
      "Total count": 1,
      category: ["Gaming"],
      Timestamps: ["00:27:39"],
    },
    {
      coin_or_project: "Immutable X",
      Marketcap: "medium",
      Rpoints: 9,
      "Total count": 3,
      category: ["Gaming"],
      Timestamps: ["00:27:57", "00:28:15", "00:29:24"],
    },
    {
      coin_or_project: "Gala",
      Marketcap: "small",
      Rpoints: 8,
      "Total count": 1,
      category: ["Gaming"],
      Timestamps: ["00:29:41"],
    },
    {
      coin_or_project: "Ronin",
      Marketcap: "small",
      Rpoints: 8,
      "Total count": 2,
      category: ["Gaming"],
      Timestamps: ["00:30:08", "00:30:23"],
    },
    {
      coin_or_project: "Pixels",
      Marketcap: "small",
      Rpoints: 8,
      "Total count": 2,
      category: ["Gaming"],
      Timestamps: ["00:30:20", "00:37:45"],
    },
    {
      coin_or_project: "Seedify",
      Marketcap: "small",
      Rpoints: 9,
      "Total count": 1,
      category: ["Gaming"],
      Timestamps: ["00:31:09"],
    },
    {
      coin_or_project: "Echelon Prime",
      Marketcap: "small",
      Rpoints: 8,
      "Total count": 1,
      category: ["Gaming"],
      Timestamps: ["00:32:54"],
    },
    {
      coin_or_project: "NeoTokyo",
      Marketcap: "micro",
      Rpoints: 9,
      "Total count": 1,
      category: ["Gaming"],
      Timestamps: ["00:34:00"],
    },
    {
      coin_or_project: "SuperVerse",
      Marketcap: "small",
      Rpoints: 9,
      "Total count": 1,
      category: ["Gaming"],
      Timestamps: ["00:35:19"],
    },
    {
      coin_or_project: "Shrapnel",
      Marketcap: "small",
      Rpoints: 8,
      "Total count": 1,
      category: ["Gaming"],
      Timestamps: ["00:38:03"],
    },
    {
      coin_or_project: "Big Time",
      Marketcap: "small",
      Rpoints: 8,
      "Total count": 1,
      category: ["Gaming"],
      Timestamps: ["00:38:24"],
    },
    {
      coin_or_project: "Pepe",
      Marketcap: "small",
      Rpoints: 7,
      "Total count": 1,
      category: ["Meme coins"],
      Timestamps: ["00:41:21"],
    },
    {
      coin_or_project: "Bonk",
      Marketcap: "small",
      Rpoints: 8,
      "Total count": 1,
      category: ["Meme coins"],
      Timestamps: ["00:41:23"],
    },
    {
      coin_or_project: "AIOZ Network",
      Marketcap: "small",
      Rpoints: 9,
      "Total count": 1,
      category: ["AI"],
      Timestamps: ["00:41:42"],
    },
    {
      coin_or_project: "Bittensor",
      Marketcap: "medium",
      Rpoints: 9,
      "Total count": 1,
      category: ["AI"],
      Timestamps: ["00:42:24"],
    },
    {
      coin_or_project: "dYdX",
      Marketcap: "medium",
      Rpoints: 8,
      "Total count": 1,
      category: ["DeFi"],
      Timestamps: ["00:42:54"],
    },
    {
      coin_or_project: "Pudgy Penguins",
      Marketcap: "small",
      Rpoints: 8,
      "Total count": 1,
      category: ["NFT"],
      Timestamps: ["00:43:11"],
    },
    {
      coin_or_project: "THORChain",
      Marketcap: "medium",
      Rpoints: 8,
      "Total count": 1,
      category: ["DeFi"],
      Timestamps: ["00:44:44"],
    },
  ],
  total_count: 46,
  total_Rpoints: 282,
};
const analysis = validateTimestamps(data, sampleData);
