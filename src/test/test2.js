import { supabase } from "../../supabaseClient.js";
import {
  correctTranscriptErrors,
  getEntitiesNer,
  makeLlmPrompt,
} from "../Llm.js";
import { LLMFactory } from "../llm/factory.js";
import { formatTimestamp } from "../utils.js";

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

const data = {
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

console.log(`${timestamps[0]}: ${timestamps[1]}:  ${timestamps[2]}`);
