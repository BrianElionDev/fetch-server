import {
  correctTranscriptErrors,
  getEntitiesNer,
  makeLlmPrompt,
  validateCoins,
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
const data = [
  {
    coin_or_project: "Axie_Infinity",
    content:
      "Bitcoin (BTC), Ethereum (ETH), Ripple (XRP)\nBitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Ripple (XRP), Monero (XMR)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)",
    usage: 0.0164,
  },
  {
    coin_or_project: "Dogecoin",
    content:
      "BNB (BNB), XRP (XRP), Solana (SOL), USDC (USDC), Lido Staked Ether (STETH), Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Polkadot (DOT), TRON (TRX), Polygon (MATIC), Chainlink (LINK)\nBNB (BNB), XRP (XRP), Solana (SOL), USDC (USDC), Lido Staked Ether (STETH), Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Polkadot (DOT), TRON (TRX), Polygon (MATIC), Chainlink (LINK)\nBitcoin (BTC)\nDogecoin (DOGE)\nBitcoin (BTC)\nBitcoin (BTC)",
    usage: 0.0154,
  },
  {
    coin_or_project: "Neotokyo",
    content:
      "Bitcoin (BTC)\nBitcoin (BTC)\nImmutable (IMX)\nBitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)",
    usage: 0.0144,
  },
  { coin_or_project: "Monad", content: "Monad (MON)", usage: 0.0024 },
  {
    coin_or_project: "dYdX",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), DyDx (DYDX)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Pepe (PEPE), Akash (AKT), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MONAD), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo (NT), Impostors (IMPOSTORS), SuperVerse (SUPER), Treverse (TREVERSE), Gunzilla (GUNZ), Ready Games (AURA), Pixels Online (PIXEL), Shrapnel (SHRAP), BIGTIME (BIGTIME), Sidus (SIDUS), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), DyDx (DYDX)",
    usage: 0.0126,
  },
  {
    coin_or_project: "Coinbase",
    content:
      "Solana (SOL), Chainlink (LINK)\nSolana (SOL), ChainLink (LINK)\nSolana (SOL), Chainlink (LINK)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN)",
    usage: 0.0122,
  },
  {
    coin_or_project: "Internet_Computer",
    content:
      "Internet Computer (ICP)\nInternet Computer (ICP), Bitcoin (BTC), Ethereum (ETH)\nInternet Computer (ICP)\nInternet Computer (ICP), Bitcoin (BTC), Ethereum (ETH)",
    usage: 0.0096,
  },
  {
    coin_or_project: "Chainlink",
    content:
      "Solana (SOL), Chainlink (LINK)\nSolana (SOL), ChainLink (LINK)\nSolana (SOL), Chainlink (LINK)\nSolana (SOL), Chainlink (LINK)",
    usage: 0.0096,
  },
  {
    coin_or_project: "Heroes_of_Mavia",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), Ronin (RON)",
    usage: 0.0056,
  },
  {
    coin_or_project: "Terse",
    content:
      "Bitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Celestia (TIA), Injective (INJ), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nBitcoin (BTC)\nBitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Celestia (TIA), Injective (INJ), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nBitcoin (BTC)",
    usage: 0.0156,
  },
  {
    coin_or_project: "Bitcoin",
    content: "Bitcoin (BTC)\nBitcoin (BTC)",
    usage: 0.0048,
  },
  {
    coin_or_project: "Solana",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX)\nSolana (SOL)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX)\nBitcoin (BTC)\nSolana (SOL)",
    usage: 0.0122,
  },
  {
    coin_or_project: "Ronin",
    content:
      "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Monad (MON), Injective (INJ), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)",
    usage: 0.0172,
  },
  {
    coin_or_project: "Ethereum",
    content:
      "Solana (SOL)\nSolana (SOL)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), Ronin (RON), Akash (AKT), Bittensor (TAO), DyDx (DYDX), Prisma (PRISMA), Rune (RUNE)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins, Pepe (PEPE), Bonk (BONK), Rune (RUNE)\nSolana (SOL)\nSolana (SOL)",
    usage: 0.0157,
  },
  {
    coin_or_project: "Seedify",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND)",
    usage: 0.0058,
  },
  {
    coin_or_project: "THORChain",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins, Prisma (PRISMA), RUNE\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), GALA (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins, Prisma (PRISMA), RUNE",
    usage: 0.0072,
  },
  {
    coin_or_project: "Imposters",
    content:
      "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME\nBitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MONAD), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo (BYTES), Impsoters (IMPOSTERS), SuperVerse (SUPER)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME",
    usage: 0.0143,
  },
  {
    coin_or_project: "Pepe",
    content:
      "Bitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)\nShiba Inu (SHIB)\nBitcoin (BTC)",
    usage: 0.012,
  },
  {
    coin_or_project: "Shrapnel",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Coinbase (COIN), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Gala (GALA), Beam (BEAM), Seedify (SFUND), PRIME (PRIME), BIGTIME (BIGTIME), SIDUS (SIDUS)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)",
    usage: 0.0174,
  },
  {
    coin_or_project: "Beam",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), ImmutableX (IMX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), ImmutableX (IMX)",
    usage: 0.0165,
  },
  {
    coin_or_project: "Gala",
    content:
      "Solana (SOL)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Injective (INJ), Internet Computer (ICP), Monad, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL)",
    usage: 0.0134,
  },
  {
    coin_or_project: "Big_Time",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo (NT), Impostors (IMPOSTORS), SuperVerse (SUPER), Treeverse (TREE), Gunzilla (GUN), Ready Games (AURA), Pixels Online (PIXEL), Shrapnel (SHRAP), BIGTIME (BIGTIME)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Treeverse (TREE), Gunzilla (GUN), Ready Games (AURA), Pixels Online (PIXEL), Shrapnel (SHRAP), BIGTIME (BIGTIME)",
    usage: 0.0125,
  },
  {
    coin_or_project: "Celestia",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA)",
    usage: 0.0078,
  },
  {
    coin_or_project: "AIOZ",
    content:
      "Solana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Pepe (PEPE), Bonk (BONK)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON), Pepe (PEPE), Bonk (BONK), Akash (AKT)",
    usage: 0.0055,
  },
  {
    coin_or_project: "Prisma",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Akash (AKT), dYdX (DYDX), RUNE\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins (PENG), Rune (RUNE)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Beam (BEAM), GALA (GALA), Seedify (SFUND), PRIME (PRIME), Bonk (BONK), DyDx (DYDX), RUNE (RUNE)",
    usage: 0.0092,
  },
  {
    coin_or_project: "Immutable_X",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam\nBeam (BEAM), Fetch.ai (FET), Internet Computer (ICP), aelf (ELF), Hedera (HBAR), Cardano (ADA), NEO (NEO), ApeCoin (APE), KuCoin (KCS)\nBeam (BEAM), Fetch.ai (FET), Internet Computer (ICP), aelf (ELF), Hedera (HBAR), Cardano (ADA), NEO (NEO), ApeCoin (APE), KuCoin (KCS), VeChain (VET)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX)",
    usage: 0.0166,
  },
  {
    coin_or_project: "Ready_Games",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games\nSolana (SOL)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Gala (GALA)",
    usage: 0.0082,
  },
  {
    coin_or_project: "LayerZero",
    content:
      "Bitcoin (BTC)\nBitcoin (BTC), Ethereum (ETH), Solana (SOL)\nBitcoin (BTC), Ethereum (ETH), Solana (SOL)\nBitcoin (BTC), Ethereum (ETH)\nBitcoin (BTC)\nMonad (MON)",
    usage: 0.0144,
  },
  {
    coin_or_project: "Injective",
    content:
      "Injective (INJ), Bitcoin (BTC), Ethereum (ETH)\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC)\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)",
    usage: 0.015,
  },
  {
    coin_or_project: "Rever",
    content:
      "Bitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Gala (GALA), Beam (BEAM), Seedify (SFUND), PRIME (PRIME)\nBitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Shrapnel (SHRAP), BIGTIME (BIGTIME)",
    usage: 0.0106,
  },
  {
    coin_or_project: "Gonzilla",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Gala (GALA), Seedify (SFUND), Beam (BEAM), PRIME (PRIME), BIGTIME (BIGTIME), SIDUS (SIDUS)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, BIGTIME, SIDUS",
    usage: 0.0058,
  },
  {
    coin_or_project: "Echelon_Prime",
    content:
      "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)",
    usage: 0.0059,
  },
  {
    coin_or_project: "Bonk",
    content: "(empty string)\nBitcoin (BTC)\nBitcoin (BTC)",
    usage: 0.0072,
  },
  {
    coin_or_project: "Polygon",
    content:
      "Polygon (MATIC)\nPolygon (MATIC), Ethereum (ETH)\nPolygon (MATIC), Ethereum (ETH)\nPolygon (MATIC), Ethereum (ETH)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC)\nPolygon (MATIC), Ethereum (ETH)",
    usage: 0.0145,
  },
  {
    coin_or_project: "Avalanche",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX)",
    usage: 0.0125,
  },
  {
    coin_or_project: "Superverse",
    content:
      "Bitcoin (BTC)\nBitcoin (BTC)\nSuperVerse (SUPER)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME\nBitcoin (BTC)",
    usage: 0.0155,
  },
  {
    coin_or_project: "Pudgy_Penguins",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Pepe (PEPE), Bonk (BONK), Akash (AKT), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Pepe (PEPE), Bonk (BONK), Akash (AKT), BitTensor (TAO), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MONAD), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo (NT), Impostors (IMPOSTORS), SuperVerse (SUPER), Treeverse (TREE), Gunzilla (GUNZ), Ready Games (RDYX), Pixels Online (PIXEL), Shrapnel (SHRAP), BIGTIME (BIGTIME), SIDUS (SIDUS), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Akash (AKT), BitTensor (TAO), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX)",
    usage: 0.0184,
  },
  {
    coin_or_project: "Pixels",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Ronin (RON), Seedify (SFUND), PRIME (PRIME), SIDUS (SIDUS)",
    usage: 0.0115,
  },
];
const validC = await validateCoins(data);

export const transcript = `[Music] that's right baby the alpha K is back streaming live to you and you are here for one reason you see Bitcoin making 5 10 15% gains you say no I don't want to take home the mama conservative games I want the RedHot dirty only fans $5 content type games the dirty alt coins and get the five 10 20 x's and leave my unspeakables burning for years you want alt coins that go pop you want the coins that make you go oh my and I got news for you my chunky little pervert you're in the right place that's exactly what we're going to be getting into in this video before it's banned off YouTube for being too hot you see in this video I'm going to give you the coins they're going top coins we've mentioned lately like nuro oh my heck even peanut up 10 billion Z it's up it's a squirrel it flies oh my and let's be frank about what's going on here you're fing back in the crypto after four literal years of me telling you hey you should buy when it's low you see Lord peanut patron saint of Magnum dongs leading with mega gains hell you even see your neighbor who is a well-known cardono holder they have to introduce themselves to everyone in the neighborhood before they move in you even see him making the big bucks now taking his wife and her boyfriend on the hottest of dates I'm talking about some real Olive golden Red Lobster style they're Banking and you're thinking to yourself I want that for me I deserve this and let's be straight no you don't but in this video I'm going to be giving you those coins like I said before the coins that go P the coins that make you go oh my coins that I've given you light super oh my Destra oh my ax and pal oh oh wait no this one edit this out just no Co did you missed out on cuz Tech Al you just haven't been around I've been releasing my same dog [ __ ] quality content for the past 4 years and you just have been flicking your bean and playing fortnite or something and now you are here at the feet of the most woke most famous familyfriendly empty house crypto advice guy the alpha golden K and luckily for you I can say actually with a straight face character aside this is probably actually your last chance to get into these coins before alt season begins because it is a right around the corner it's waiting like a holder watching from the closet just inches away from the action and in this video what I'm going to do is I'm going to get you in on that action you're not going to be watching like a cardono holder you're going to be the one doing the [ __ ] because in this video I'm not just going to give you some of the hottest Industries and niches and ALT coins you need to be looking at I'm also going to show you how alt season is going to work so that for the two or 3% of viewers on this channel have an IQ above 10 you can actually go get your own coins and find your own coins will pop coins will make you go oh my and then we're going to get into the hottest nich in crypto and in throughout this video I'll be listing the coins that I'm looking at but unlike other videos where I just list them all at once and then you records come in here ape in and lose all your money I'm going to subtly list them throughout the video so you have to pay attention cuz you goofy little [ __ ] you come here you try to get the coins without the understanding it's like giving a Jedi a lightsaber without teaching them how to use the force remember what happened last time oh my that was bad so without further Ado what we're going to do is we're going to hop into the Zone we're going to hop into the nether region I'm going to show you the coins we're going to we're going to load up my computer and I'm going to show you how this alt season is likely going to work and break down exactly where you should probably most certainly definitely be looking in crypto right now so without further Ado let's get started so first things first let's load up coin market cap and get into the very lowquality unacceptable level of content you've come to know and enjoy on this channel we're not upping the budget we're not upping the quality I realize it's a bull run but what we're going to do on this channel so we're slowly going to just make the channel worse and worse as The Bull Run goes on because it's [ __ ] funny but on a serious note let's talk about what's happen in the market and what's about to happen my first big tip for you is follow me on Twitter at zss Becker no it's not X it's Twitter I'm 36 years old I'm not learning new tricks or new words time froze for me at 35 I still play the Nintendo 64 I refused to move on with my life but seriously follow me there cuz these videos take me forever to make and contrary to Common belief I don't wake up every morning one inject myself with heroin and cocaine to amp myself up to make those stupid intros so follow me on Twitter CU get updates a lot faster a lot sooner there and this bowl is going to move lightning fast so you need updates much faster than I can make in these videos but if you want these videos and more of them you should subscribe cuz most of you aren't subscribed and again the bowl is going to move fast so I'm going to make these videos and then a week later the content's going to be completely out of date and then a week later the entire Market could change so you want to be on top of updates instead of not on top of them now look I realized you just want me to jump in the coin picks and start slapping out bangers left and right you want me to just throw out the next peanut like I did a few weeks ago it is now up uh 18 billion per. and I know what you're thinking Alex you never actually told me to buy peanut wait wait wait I sh posted about peanut non-stop during election I even saw this coin all I did was post little pictures of this [ __ ] squirrel all over my Twitter yes sure I didn't buy any and I technically didn't mention the coin but I basically made peanut I'm taking credit for this everyone who's made money here this is due to me and I just didn't get on on Peanut because I was just being charitable I just wanted everybody else to make money with peanut on a serious note I did sh post about peanut 24/7 and didn't buy any of it and [ __ ] all you people that got in this I hate you you are human ass I will resent you and I hope you never make money ever again because you've exposed me for the sh sh crypto investor I am how did I miss this but on a serious note I know you want me to get in and start whipping out alt coins like this and start start making 20x [ __ ] coins rain from Bad Hollow right here we need to talk but unlike other crypto channels I want you to actually succeed and what I'm about to tell you at the beginning of this video is a going to make you so much more successful when it comes to trading altcoins going to prevent you from losing all your money which is really the goal here because 95% of people in crypto like I said do not make money please read the disclaimer at the bottom of this video I'm not going to make the two three minute warning like I do in other videos we have stuff to do I cannot stress how risky and how gambling what we're about to do is and at 95% of you if you're new here are probably going to lose money please read the disclaimer in detail go through it I'm not kidding add a character just please read it it's very important it's not some typical legal disclaimer where people just throw it out there just to cover their butt it is actually a broken down warning for me on what you need to be looking forward and the risk you're about to take because I don't want you to lose all your money and also to maximize your gains and know when to sell these coins I'm going be talking about here whether you look at the coins that I'm looking at or you use like a smart person the concepts I give you in this video you're not going to know how to maximize those gains and win the exit without what I'm about to tell you at the beginning of this video so this is so damn incredibly important please wait and go through what I'm about to say because it's going to set you up to have success far more than just skipp into the end of this video and looking for coin picks which is what 90% of people do let's talk about what's happening in the market and what's about to happen that's very very important so I'm sure you've probably all seen that Bitcoin has been charging like a wild ape and what I've been seeing all over crypto Twitter and all over the place is people being kind of a little bit pissed off that their altcoins aren't pumping so if we go and look at pen it again to remind us how poor we are if we go and look at all the altcoins salana hasn't done like a 200% move Dogecoin has because apparently we we just all invest only in meme coins now and this is the only source of making money in crypto just kidding I I'll get in the meme coins here in a second this I know it's tempting to want to fomo completely in the meme coins at this point but I don't think that's the move right now I think alt season's about to begin and I'll explain why but if you see and we look at our our good old fashion utility and and altcoins they haven't pumped super a lot I mean Karo if you actually go look at this thing it is it is done it went from 30 to 60 it's almost done 100% move so we're seeing some gains but not those crazy gains that we want to see yet and the reason why everybody's so soggy about this is because apparently I'm going to have to re-educate you guys on how the Bitcoin and a Bitcoin and altcoins move in a bull run and if you're new to this you have to understand this because this rotation I'm about to talk about here is what we're probably going to see two three maybe even four times this bull run and if you're not prepared and you don't recognize this this rotation you're going to keep doing the number one mistake that everybody does it's it's where basically something's pumping you jump into that you try and make money with that and then it stops pumping as soon as you get in and other things start pumping and then you sell that thing and you hop in and try and Chase these things and you end up chasing pumps in crypto the way you make money is you have to get in coins a few weeks before people get into them in a bull run now the best thing to do is what we've been doing the past four years you can go through I've made four years of literal content talking about coins we should be looking at and the industries we should be looking at the best way to make money in crypto is just to buy during those times you it's really high risk to be hopping into the middle blow run or to start of a blow run and then trying to chase down pumps and coin the good news is that alts and smaller coins really haven't started moving yet and Bitcoin is doing its typical dump after it makes a charge and so they're even a little bit in a fearful down state right now I truly think this is probably one of the last times you're going to be able to get alt at anywhere near a decent price that you can sit on for the rest of the bull run which is what we want to do on this channel and 99% of people watching this we are not Traders we're not going to be pulling some Wolf of Wall Street swing trades what we want to do is we want to find good altcoins that we can sit in for the next four months and do nothing not trade not anything and then take profits as they go up once Bitcoin reaches a certain point which I'll get into in this video that's our goal and our last chance to easily do that I think is right now so what you need to get is the typical Bitcoin rotation in crypto that everybody seems to be forgetting so let me give you a little recap on this the way a bull market usually works if you look at the last three bull markets and it's working exactly the same way right now is Bitcoin is always going to move first I can explain to you the theory and logic behind all this but that's a completely other different video if you want the whole actual fundamentals of how crypto works by all means there's plenty of videos on this channel about that there's even an entire video that I've linked below here that breaks down how to trade small midcap coins I'm going to leave a lot of the theory out of this cuz I know you just want to get into the oh my the the pomp that we screamed about at the beginning of this video so trust me we'll get to that in a sec but you have to understand Bitcoin moves first it's the king of crypto all of crypto every coin moving right here revolves around Bitcoin this isn't the stock market where we have coins moving individually everything moves based on bitcoin and so when Bitcoin is doing these ginormous moves all coins the coins that we're really looking to make money in here especially the mid and lower caps we're going to talk about they're probably they're they're going to go up a little bit or they're even going to Sag why is this it's because everybody's watching Bitcoin and all the liquidity is going in the Bitcoin and really we're not going to see these coins start to move a lot until Bitcoin Finds Its Foundation or plateaus and hangs out and so we're going to see is likely what we're seeing right now bitcoin's pumped a whole lot and now it's going down and people are waiting to see if it starts another charge up and as soon as Bitcoin goes down a little bit and then plateaus and slowly declines we're going to see in this period of time right here altcoins and midcaps I can't spell alt once the word gets past two letters it's really Beyond me we're going to see ults start to run very hard and what's going to happen with ults is we're going to start at the top Al we're going to see salana we're going to see C sui so that's what that's we're to call it cor for now SE all right that's that's going to be a joke that sticks on our Channel I took all my life saving I invested SE all right I don't I don't know how to pronounce the coin I don't even know much about it but it's going to pump super hard we're going to see coins like n we're going to see top coins all start to move and then we're going to see the money start flowing down into the smaller coins primarily sectors of the industry that are really hypey right now those being real world assets which I'm going to talk about a little bit in this video I haven't talked about too much but I think that's the Hidden Gem that people are not looking at it's going to be AI it's going to be gaming and then I think we're going to see a lot of money move in the meme coins so you're really going to want to look into that video if if you're looking to go hard in meme coins right now what's going to happen is what I just described Bitcoin is going to then plateau money's going to roll in alt and it's going to work its way down to these smaller outs it's going to start the ones that are worth many billions work its way down to the ones that are worth just a billion and then work it down to these smaller ones that are sub 1 billion that we're going to be talking about in this video and that's where the 20 30xs over the course of the BL run are going to come from this point now look you could have just bought salana after the FTX crash we were talking about it then I didn't so much get into salana here but this has made a clean 20x almost or at least a 15x since it crashed that's the benefit of buying early for example you could have got in the super last November when we were talking about it and this thing went all the way up to a5x recently when we talked about and we could just sit in super nice and comfy now so that's the that's the way to get those 203x in crypto what we have to do now to get these 2030 XS is we have to beat people to these smaller coins right here so everybody in crypto is looking here and they're looking at meme coins right now the way we win here is we have to beat where people are going to be next and it's going to be right here so before we actually get into those coins and then indries you should be looking at you have to understand there's going to be this rotation multiple times in the boring what we're likely going to see right here bitcoin's going to go up it's going to Plateau like it is right now alts are going to start to move super hard because money's going to move out of Bitcoin this money we saw taken out right here it's going to move out of Bitcoin and then go into these alts also we see tons and tons of retail flooding in right now I'll have my editor put up the search volumes but the last 6 months we've seen interest in crypto at alltime lows Bitcoin was sitting at $67,000 and no one was searching for it it has not been until this last week that people have actually started searching and looking in the Bitcoin and crypto again what all these people are going to do is they're going to see these gains in crypto and they're see the gains in Bitcoin and they're going to say what's next and so they're going to come in and they're going to actually start researching these top coins right here as they start making money in these coins they're going to get addicted to crypto and start moving down to the higher riskier coins they're going to be do what is called the Newbie Shuffle so for example my first blow I got in and I primarily just owned Bitcoin in ethereum and those pumped I'm like hm well I bought Bitcoin in ethereum I must be really smart I I can trade these smaller coins and then they come in uh and get absolutely washed like I did early in my crypto career trying to trade these coins right here but that's fine cuz you're watching this video and you're still semi- early to the run so we're going to be the ones doing the washing here we're not going to be the ones getting our butts rubbed by creepy crypto veterans we're going to be the runes the one ones rubbing ass here but what you need to know and be prepared for is part of this rotation is Bitcoin taking a big dive in my opinion I don't think we're going to break 100K on this pump right here I don't think we're going to see that till later this year what we're likely to see is Bitcoin now hover between 80 I I'm throwing these numbers out arbitrarily I don't try to do TA or the graphs or anything like that because I think that's pointless what we're going to do or what we're going to see is likely Bitcoin hitting down to maybe 83,000 whatever and then bobbing between here $90,000 it's just going to plateau and get very boring then we're probably going to see a few weeks to maybe even a month of all it's going nuts and Bitcoin doing absolutely nothing then we're probably going to see Bitcoin take an absolute dive to put this in perspective for you if we go look at the last book run right here you can see when Bitcoin made its first Power dominant move its first Power top move it really started laying that pipe and this was actually not so much when people really started to get into it it was about right here okay and this looks like a very short period of time but it wasn't it it it came through it pumped up and then it slowly went up to the 30,000 and it hovered around here and if we look at this date from its peak which was 18 2021 and then just look at ethereum which I believe salana is very closely mimicking ethereum's Behavior last Bull Run you can see when it went and made its first pop up so this was the dominant move right here you can see it was actually almost a month after Bitcoin made its first high right here so you can see this is 115 2021 this is when it made its first little pump right here and what we saw ethereum do is it waited a full month almost before it made its peak and so that's probably what we're going to see right here everyone's like why is an ethereum and all these things moving well one the reason we're not seeing ethereum move is cu it sucks buying a a coffee with ethereum cost you $30 in transaction fees right now it's not really feasible in the real world but that doesn't matter this is crypto the reason we're not seeing ethereum and all these things move is because it's doing the same thing it did last bll run and so we want to for example we're right here you can see this is the point when Bitcoin was really making its run up right here this one six point this is when Bitcoin was really moving we want to move into this point right here in altcoins and then beat it right here this is where we're going to make our first gains at and we're going to see very outleveled gains very huge returns if we get in the coins lower than this so if we go and look at for example uh let's go look at B&B this is example of what we're trying to do right here we're going to go look at the last Bull Run and you can see here's where Bitcoin was peaked at all right so this is when Bitcoin was pumping hard then what happened is ethereum moved and then you can see this is after ethereum's Peak right here you can see it B&B absolutely shot up crazy amounts it went up from $30 to $200 like that and so we're not really looking to ride the ethereum like waves we're looking to ride this wave right here and the way we do that is by predicting this rotation and getting into people before they buy the B&B like coins that we're trying to buy right here this is a strategy this is what we're doing and if you want more updates on this you want this sooner follow me on Twitter at zss Becker now the last thing I'm going to give you with this is that you have to be able to be patient here and you have to be able to hold through some stress and pressure now I want to be completely transparent I think a lot of the coins we talk about on this channel specifically right here if it's not these top coins right here they're all likely going to zero and by zero I don't mean absolute zero but we're probably going to see the exact same sell-offs in a much bigger way than we saw last B on I not suggesting that you long-term hold or view any of these as big lifelong Investments or even safe Investments what we're doing on this channel particularly the coins we're about to get into later on this video These are hardcore gambles I fully expect 10% of these to probably nuke in the middle of the bull run I expect almost all these especially ones later in the video to take massive 80 90% dips so if you're not looking at this and timing this right here by the end of the Run you're going to lose a substantial amount of your money especially if you're buying later in The Bu run or you buy after these pumps this is where everybody gets killed that so please I have to stress I'm going to focus on a little bit more lowrisk stuff at the start of it when I start talking about coins if you haven't been in crypto for a while I'm saying like dude just just focus on the lower risk stuff that I talk about it's all massively risky these are all going to take massive Dives even the best coins like Solano went down 90% so please I stress when I talk about holding here I'm not suggesting you look at these like stocks I'm not suggesting that I've picked the most magical best new technology and I'm going to hold it to the Moon with you and we're all going to make money together these are extremely risky [ __ ] coins they're going to pump super hard and everyone including me is going to be looking to super turbo dump all these coins when we start getting around these levels right here and if you've looked at my mem coin selling video you know I'm going to be selling and start selling my coins more so when we're about like right here with that in context please listen to my advice right here you're going to have to be patient with the these moves cuz the way you make money in the Bull Run is you have to sit here and squat in things for a while okay bitcoin's moving right now and everybody's getting really upset that their alts aren't moving and so they're really Panic moving in the memes and Bitcoin okay and they're trying to chase meme pumps after the coin's already pumped this is a losing situation right here because you're chasing pumps instead of waiting for pumps to come to you waiting for pumps involves a period of being soggy and not making money which is why everybody's all upset right now with their alt in utility coins don't worry it's going to probably happen you also have to understand you're going to have to hold through some really ugly dumps on the way up to the top now there's a really classic picture which I'll I'll have my editor put up on the screen right now of how many times Bitcoin dumped on the way to its top in 2021 and even 2017 you're going to see multiple 20% 30% haircuts on bitcoin on the way up we might not see that level of volatility since we have so much big money in Bitcoin now but we're 100% going to see some types of dumps and we're going to see that reflected in ethereum and we're going to see salana and these other coins probably take and I I think altcoin is going to move based on ethereum and salana take huge dumps and if you look at the last blow runs if you sold on any of these dumps you pank sold you got absolutely rocked so I'm not going to zoom in and go through all the hoopla again but in my first Bowl I was holding ethereum and a lot of alt I bought right here okay and then Bitcoin went up here it went to 30 thou or 40,000 and then dumped all the way it it touched to about 28,000 for a second it's very scary if you've never experienced these before I was I thought was about to lose everything I was terrified and so of course like an idiot I just tried to sell everything right here and I was doing the whole beginner Shuffle where everybody logs in the coinbase and tries to send out all their coins and sells them for idiot prices all the smart people then come in and buy and it goes up again so my advice is we're probably going to see one of these dumps now could this possibly be the top of the market right now it could be I don't know on this channel I'm not trying to act like I can I can predict the future like every other channel they can't then they Allure and put all their viewers in a false sense of security that they know what's going to happen and then it doesn't happen everyone gets rocked all I'm doing is I'm looking at other bull runs and making really General stupid person rules on what's about to happen what is most likely to happen based on my stupid person rules is we're going to go up and we're probably going to see a really bad dump before 100K in my opinion Bitcoin at 100,000 is very similar to bitcoin at 50,000 last run before we make that 100,000 charge we're going to see a really nasty dump and people are going to conclude the bull market is over I'm going to hold to that I'm expecting it to come I'm just not going to sell and I'm going to hope to Lord peut painon sane of Magnum dongs that that's not the top of the run if it's not I'm screwed I'm going to lose all my money if you hold through that you're screwed you're going to lose all your money it's just that simple it's a roulette table we're taking a gamble here but you're going to have to hold through some really painful periods in altcoins if you want to ride them to the Top If you're new to this or you're not a professional Trader you're not going to swing trade these things to Victory so what we're going to have to do is we're going to have to hold and we're have to wait for this entire cycle that I just talked about here to reset we're probably going to see this cycle reset two to three times I'm probably going to start selling after the first cycle and I'm going to be selling all the way up and all the way down I'm not going to try and time the top and if you're interested in how that works watch my my smaller coin trading video so that's a full recap on what's about to happen since you're actually prepared to manage this now let's get into the part you've all been waiting for the coins so in this video I'm going to be focusing on more of the bigger coins in each of these sectors because I know there's a ton of new people flooding this channel I don't think the first video we should come back with while the bull runs confirm is some big small tiny alt coin video I will be making videos like that next week we will have an AI video we have a gaming video we have a real world assets video we'll have a mem coin video and I will hint at some juicy coins in this video but I want to give you the overview of where the look and how to look at it because my goal here in this video is absolutely nothing for you I going to tell you shrip the best thing to do is does not touch this you're probably going to lose all your money that's my number one advice but you're not going to listen to that that's not why you're viewing this channel you are here to put your dick in a pencil sharpener with me and hope that no one plugs it in you're here to be to generate you're here to gamble and so by all means if you want to put your dick in the pencil sharpener with me and do the Macarena all cocky like and hope that doesn't come to some bloody Stumpy End by all mean let's do it but my number one advice for you is don't trade crypto now my goal with this coin video is Mor show give you coins are going to score 5 to 10 X's with minimal chance of them rugging AK not exploding if you get into a lot of the smaller coins we're I'm talk about in later videos these coins not only come with the challenge of having to trade them and recognize the extreme vol ility a lot of them will also just implode the projects will fail they'll get hacked a few of them are rugged this is just what happens when you get into smaller cap coins so I really don't want to set up people just new to this watching this with those type of coins if you want to see those type of coins I do talk about them a little bit on my Twitter what I want to do is I want to give you the areas you need to be looking at right now the first place I'm going to tap into in this video and the reason why I'm sharing it first is because I haven't researched this place in crypto as much as I think I should and so everybody's super duper focused on Meme coins right now and I'll talk about meme coins here in a SEC but the place that I think is completely being overlooked and is going to attract so much like institutional money real money coming in is going to be real world assets so what you have to understand is a lot of people are looking at meme coins right now and flooding into those I think meme coins are going to do super duper well a lot of people hate meme coins so they suck up liquidity and all this kind of stuff that's technically true but almost everything in crypto is technically a meme coin none of these coins or technology do anything at this point I think crypto is going to take over the world I think it's going to be one of the most important Technologies I think it's going to be used in literally almost everything video games banking transactions how we vote that being said there is a lot of hyper in us and we're looking at a DOT situation right here like in the do com boom most of the companies launching didn't actually do anything and that's taken to the most tensest degree in crypto because you can launch a coin and start taking in people buying them with zero doing nothing you can L just type in a little bit of code and boom you have a coin and you can say oh I'm doing something it's a great way to raise money it's a great way to make money and because of that we just have coins that that do mostly nothing launching all over the place so please don't ever mistake my my intent on these videos I think almost every coin in crypto is vaporware I think they're all meme coins and what I'm looking for in crypto is not some gamechanging technology I'm looking for pump the metals I'm trying to find coins that have the right narrative the right attention and the right interest that will make them go up a lot of coins that go up and pump in bull runs do absolutely nothing so that's why I don't really hold any resentment towards mem coins and I've been getting into a little bit of Mage myself we are going to see actual adoption start and what focusing on this video is where the adoption is actually going to be we are going to see a lot of big institutional money move in the crypto with an investor mindset this means they're going to be wanting to invest in technology it's going to be big in the future I don't think we're going to see huge investors or people with their 401ks or people with a lot of money moving in and wanting to get into meme coins meme coins are kind of a phenomenon that we're going to see Ultra beginner people get into and Ultra low-level retail get into and we're going to see crypto natives or ogs getting into this is why you saw memecoins doing crazy gains during the bare Market because it's something that's kind of reserved for the crypto community so what I want to do is I want to beat the actual investors I want to beat the people that are going to have 100,000 200,000 are going to be moving into the crypto because they actually want to invest it long term where are they going to invest these things I think the top place you're going to invest these things is real world assets this is crypto that manages and controls the distribution of assets so I think in the future for example something that's going to be really huge is we're going to do all of our real estate contracts via crypto if you've ever looked you ever bought a house it's a disaster you could easily do the transaction by transfer of of an nft to one person to another and it's managed via blockchain and they pay for it via dollars on the blockchain I think that's going to be something that's absolutely huge the ownership of cars the ownership of houses how we vote Distributing shares of a real estate portfolio I think stuff like that's going to be absolutely huge and I think real world assets is going to be where it's the most Huges at because that's exactly what I just described and so I think we're going to see so much money flood into these and I'm researching these right now I might make a real world assets video I'm telling you this right here is really easy for mainstream investors to understand and I think this is where a lot of money is going to flood into so what I would do is I'd take the logic I'm about to show you in these other two niches and apply it here because you can find a lot of coins that are being completely ignored right now I think this is a niche to actually research in it's being completely overlooked I'm going to be digging into it a lot over the next few weeks now backing up a bit to actual coin picks if I was building a portfolio of altcoins and I really didn't know what I was doing and I just wanted to sit and be dur dur this is what I would do so if I'm going to build the most basic portfolio for somebody I'm going to go and get exposure to the main altcoins and then get top exposure to the top altcoins and these niches I think are going to pump super hard so where I would start at is I would just start at salana I wouldn't add ethereum to my portfolio I think ethereum is going to do similar gains to bitcoin except Bitcoin has so much more security and long-term success almost guaranteed to it that ethereum just doesn't have I can make an entire video trashing ethereum I'm not going to do that it would just waste everyone's time there's no point to that video I just think you know ethereum if ethereum does a 2X Bitcoin is going to do like a 1.7x and I I I don't think that extra 3x is worth the risk that comes with ethereum I just don't now salon on other end I think is probably going to go to at least $400 $500 people are theorizing $800 to $1,000 I think that's totally on the table especially if we see Bitcoin charge past 150k which I think is on the table I do think there is potential for K Bitcoin that is not what my trading or uh strategy revolves around I'm I'm I've been waiting since November I've gotten to a lot of coins very low I'm going to be taking profits on those well before we get to 150k 200k bitcoin I'm not waiting for that I am completely fine not even coming close to the top of this bull market you have to understand when I talk about everything we're not I'm not trying to hold till the tippy tippity tip and then I could I could take all my gains right now be very happy but I don't think we're anywhere close to the top right now so I think salana that's where I would start my portfolio with then what I would do if I want some meme coin exposure is I would actually add Pepe okay and if I want some really juicy mem coin exposure I would actually add peanut okay that's where I would start with and I wouldn't put a lot of money into those but I think peanut could have the chance to be like a shib and I think Pepe is going to give phenomenal meem coin gains and I think it's probably going to get up you know probably if if we see a meme coin run probably a $3 billion market cap so that's why I would that's why I would stay in meme coins if I was a now an actual coins I would throw in there I hate I hateing saying this this makes my skin crawl but I think cardono is probably going to go back up to its old all-time high which is probably about almost a 5x from here I've been dogging on these guys for four years straight um since I told them to sell at $3 they all viciously attacked me and then I got to troll them I got the pleasure the honor of calling a coin at its abs absolute picky tippity tippity top and being able to troll the people that made fun of me for four years straight look we're in a bull market right now cardano has a lot of attention Charles hoskinson is a big name in the space he did just sign up to tell people in the US government how to make policy and as much as I dog cardono holders I hate the holders they are the worst people in life they're they're all it's it's a coin that's exclusively made up of Chuck-E-Cheese employees just round little 5 foot2 5 foot1 manlets they all ride around town on scooters I don't know if you've ever seen a gang of Cardon it's very intimidating just a bunch of sweaty little Hobbits all patrolling around town on Friday night looking for their wives cuz they have no [ __ ] clue where they are they're terrifying species I don't like them that's why I insult them and make fun of them behind the safety of my computer I if I saw one of these groups of men on in real life they swarm me with their limp little lotiony wrist and aggressively try to Pat me down or whatever a cardono holder considers fighting just terrifying I'd be covered in lotion and smell like a Chuck-E-Cheese hot dog vendor for weeks I don't want that to happen I'm not leaving my house because of it that being said cardano does a lot of things right the technology behind it actually works really well and so I think based on that cardano's probably going to shoot back up to its old alltime high so I would actually put cardano in a newbie portfolio now the other coin I would throw in there is avac I think aax is going to be the little brother to salana and I mean when I told you about avac last november-ish I said AAC was the coin to watch if you want the gains things done a clean 3x from there and I think it it has plenty of room to charge back to this recent all-time high right here when I refer to all-time highs a lot in this video I'm not going to be referring to these all-time highs I'm going be referring to the recent alltime highs cuz these are a little bit more reasonable to talk about the market caps and our dilution of these coins are very different at this point and so these prices right here aren't very helpful there was just way less ax in the market then than there is now so I think we're going to easily be returning back here and I think $100 $150 maybe even a $200 aax totally on the tape I do think and I've been calling chain link since the dawn of time and chain link has been disappointing since the dawn of time I wouldn't add this to your portfolio if you want big juicy gains but chain link is like the most essential technology in all of crypto I would have that in a portfolio next we want some exposure to Ai and gaming I have entire videos breaking down why Ai and gaming are going to be huge if you want to see those they're just a link below here it's very important you understand these because I think these are the two first biggest use cases in crypto besides that real world asset situation I described before so where I would be starting at an AI is I would start with bit tensor I'd start with artificial super intelligence Alliance they did a stuff recently really made a lot of people mad but I think it's going to do very well I'd also start with render what AI coins do is they manage the infrastructure or processes of a lot of AI servers or the power behind AI or they manage the streams of data so for example if you look at a coin like Theta it streamlines a lot of the things that YouTube and other companies use for their video streaming data and it streamlines that using blockchain is just way more efficient cheaper and it's probably what everyone's going to use in the future I haven't looked too much in Theta so that might not be the most like accurate assessment but what I just described there is what from a 30,000 foot view AI coins do it is such a phenomenal use of blockchain we're all going to use in the future that's why you want exposure to this so those are the coins I would start with in AI now if I'm looking to get some exposure to gaming where I would actually start at is avax which I just described we saw a game off the grid recently launched and it added more wallets and actual real use of blockchain over 10 million wallets were added and people using using it to play this game that's the most demand we've ever seen for blockchain outside of trading in nfts that's real world use we are going to see almost every game using some form of blockchain Technology within the next 3 to four years I think this is probably one of the better long-term investments in crypto I think if you're looking for mega super high-risk crazy pumps it's going to be mem coins but that's super hard to predict especially if you're new I think if you're looking for the most consistent to predict pumpi coins in crypto it's going to be AI coins I think the best longterm investment that's also going to give really good gains in this SP run is going to be gaming and so if you look at for example AAC our first successful game off the grid delivered so much volume on the Chain higher than anything we've ever seen before we're about to see almost every game using this in the next 2 to three years in my opinion and we're going to see all these coins go nuclear from speculation because of it now what we want to do first is we want to look at the technology that's going to be used the most in gaming this is the infrastructure that provides all the things that all these games are going to run in yes there's a lot of games that are really good I'm not going to talk about them too much in this video we'll get into that in our gaming video I also have a gaming video link below this video that list all the gaming coins that I'm in and looking at and how to actually look at the gaming industry as well my opinion on those those coins hasn't changed too much since then because this is a really long-term investment for me so if I'm building a more beginner portfolio where I'm going to start at is aex aex aex aex I think that's going to be the Big Chain that gaming is on and that's going to drive aex to Crazy levels next I'm going invest in IMX and beam these are the two most solid core fundamental infrastructure coins and all of gaming and if I want a little bit more exposure to something that's on similar levels to those but still a smaller market cap I'm going to get in the superverse Elli and what he's doing over there is really special I think almost every game in the space is using super in some form now and then I'd also throw in Ronin which I think is a blockchain that a lot of games are going to be using there's a lot of good coins right here but those are the ones I would stick to I think AP coins either going to do insanely well and be the top gaming chain or one of the top gaming chains or I think it's just not going to do anything and that's why I would stop with with my highle gaming coins that's where I would draw the line if you just put that portfolio that I just laid out right there I think that's going to do very very well and none of those coins have any risk of just nuking before the Bull Run is done again I think a lot of coins are going to Nuke these ones if they do nuke they will be around in the future they will keep going and at least you can hold them for the next five plus years through a bear so for example if you held super through the bear the coin shop and again the valuations were different this time but you can see you know it shot up right here it got to these really high levels right here and it's came right back because Elliot and what they're doing over there is pure quality yeah it sucks if you're going to hold through all this right here this is where we actually started buying at on the channel right here again that said you know at least these things have a chance of coming back and so you don't have to like Panic sell your investment at the bottom if that happens to you you don't want it to happen to you by the way now what I want to talk about is coins that are right underneath this layer of security that I would get into if I wanted to make a lot of money in AI where I would start at as like a mid-level risk portfolio is I would start with Destra I think this is going to be the chosen child of the run and I want to stress other the coins I'm about to mention right here there is a chance they nuke I've mentioned coins on this channel before where the projects have failed these coins have potential to fail everything I mentioned that that the ones I just mentioned above they do have a chance to fail but not on the consisting levels of these coins these are more riskier coins and the deeper we get down here the more chance these coins have to fail and absolutely wipe out before the end of the bull run and eliminate all your gains mid bull that's the worst case scenario with these coins and as we get into these lower ones this is what you run the risk of these are startup companies these are new or semi- new Founders there's also sorts of things that can happen to these coins so for example to lay it out Powell which is still one of my favorite coins just to put this in perspective was one of the chosen children in AI then they proposed recently this proposal to merge with another coin The Proposal got rejected regardless of that people hated the proposal and the thing absolutely nuked recently now I think pal is probably going to come back and do very well this blun but you can see the volatility right here pal was one of the most sure bets in all of AI gaming crypto went from being really good to absolutely in a questionable range right now now I'm not suggesting you buy pal in this video I'm still holding all my bags of pal through this and nothing has changed with pal whatsoever other than people's view of the coin okay so I want to really state that even if something's a sure bed in these spaces it can do this really quickly when pal did this the other day and Twitter people are tagging me and stuff like that I'm like this is this is what happens in these coins these are the riskiest coins in all of crypto right here and even though pal changed nothing about their business model nothing about the coin the narrative in the community got mad at them and they all Panic dumped the coin and this is going to happen especially in coins I talk about in my later videos when we talk about the smaller coins so I just want to prepare you for this now before I talk about any higher risk coins and also just introduce you this if we're talking about trading altcoins this is something you have to understand about them so coming this if I'm going to start building a more higher return AI portfolio I'm going to start with Destra I think it's going to be the chosen childish room nothing has a narrative and has a stronger narrative behind it than Destra I have a absolutely massive bag of Destra by the way and I don't own all the coins I mentioned on this channel but I do own some of them and the ones I do mention that I do own I have m of bags and I've gone very heavy in crypto on top of that I do consult and advise a lot of these coins and yes they pay me for that so of course I want these coins to go up and I will be selling these coins in the future as well so just being completely transparent with you right there I don't want to do like other channels do where they like act like they have little tiny bags or just suggesting something out of the goodness of their heart and don't have any like incentive or Tide and then they say they're going to like hold to the Moon with you and whatnot no I'm here to make money just like you are so please I just got to be transparent with you I think dester is going to be one of the best Runners now if we go down I also think Echelon Prime which I don't own is also going to be a fantastic AI coin to deliver really high returns pal used to be one of the most sure coins it's in a very hazy spot right now this is definitely a really high-risk trade to take because it could run up right back to where it was here very frequently they do have great technology and they are doing great things at pal but they they really made a PR poooo here recently so that's if you're looking for a highrisk trade pal now zx0 I think is in the same level as pal except they didn't make a PR poo poo and I think zx0 is going to charge super duper hard then finally where I'd stop at is going to be node AI there's a lot of other AI coins that I'm in I think anyone should almost almost be on this list I think that's a really really good coin neural AI is one of the newer ones I think is a really really good coin but these are these are more newer coins that I'll be talking about in the AI video if I was going to stop this list at Mid risk I'd go with node AI right here this one's going to do super duper well as well now there's other coins we could talk about I think neural is a mix of gaming and AI hash AI is another one I think has phenomenal Nar behind it Palm is doing super cool things and another great one but I want to stop at the mid- risk in this portfolio all right so that's where I would stop as a node AI if you want to go investigate those other coins I mentioned by all means now in gaming crypto if I'm looking for explosive return mid risk coins I'd have to actually just start at Super again I think Super is going to do super duper well uh there's so many things going for it all of the tech behind it and every way it's plugging into games that's one of them basically every game in crypto has to answer the super some way right now on top of that it has probably one of the most powerful influencers behind it Elliot and everybody that's really powerful in crypto also is in this coin and so what you have to look at in crypto 2 is the narrative behind coins and where people are going to move into sup at the top of that list for me Echelon Prime is another good one CU it ties into gaming and AI so you have the double whammy right there I go with cify because a second any games start to pump really hard the seed Investments are going to be really really really chased after and so everybody's going to want to start stocking up on cifi again so I think that's another good one miria is a really solid infrastructure coin that I think is going under the radar right now that I think is going to do very well and has a great team behind it and then cus is just a good old classic I think is going to do really well again because it just has the Launchpad and they're also founding ton which I think is going in end the coin soon that's coming out for ton I think that's probably going to be one of the hottest game coins in crypto and then two that are under the raadar right now that I think you should look into are Alura these are these are a little bit more higher risk but Alura because it provides nft technology that plugs in in all games and there's also another infrastructure coin called xorg which is in my opinion I think infrastructure coins in gaming should all I think they're all going to pump to super high levels up here because they just plug into all games and the safest way you can invest on crypto gaming is find infrastructure coins that plug into all the games because the way game coins work is if a coin is a hit it pumps super hard if it's not it Just nukes that's really hard to predict sometimes infrastructure games are going to get wildly speculated on just bar none so there are some really good game coins that I haven't mentioned here cuz I just don't want to mention individual gains in this video on top of that the only other one I would mention that's really good is carrot and if I was going to make any gem in this video this studio is super undervalued at this point in my opinion and it just became a chain very similar to ape chain and so I think the combination of my pet hooligan what's coming out their combinations with AI the things they're doing as a studio on top of the fact that it's now powering a chain I think it's going to do some crazy numbers the one thing you want to watch out four on here that gives me any hesitancy on carrot and people you know I love carrot but these fully diluted market cap values right here they will come in the play in the bare Market or as this bun comes to an end it will result in a lot of selling so what's going to happen is a coin gets super high up and then all the original investors which I'm one of them by the way I have a big giant bag of carrot I love carrot they're going to start selling when the market gets really hot okay and so if let's say that carrot goes like five bucks or something like that you can bet when these people start getting their coins unlocked they're going to be selling and that's going to drive the price down bigly just like it did alivium last run but if I go and point out alivium to you you can see that really didn't hold it back last run you can see it it did crazy returns and even though it had a crazy fully diluted value you can now see what happened as those people took profits and it caused just as huge as a dump after I think alivium is going to do pretty well this run I'm not really commenting on it too much in this video it's not one of my bigger holds anymore I just wanted to show you an example and a reference for carrot on what you can kind of expect if carrot gets picked up whenever I talk about coins this channel one of the main things I'm going to look at is so you can see super had this exact same problem last run you can see all the investors came in and then they super dumped when their coins got unlocked if you look at the fully diluted value right now it's within 2x of it which I think is healthy the best is where if you look at something like Destra and there's just absolutely the same exact market cap as the fully diluted value almost that's that's where you really want to be at but a lot of the AI coins launched on different models than gaming coins and so for example super in this situation was raising money so they had to get investors in and lock up their tokens so that was a long video but we had to get it out there we had to start the the the bull market I did not want to speak for that long but we had the kickoff alt season somehow with a really good thorough recap again I don't want to even recap this video we talked about so much those are my thoughts on altcoins I don't have anything more to add and I don't want to talk anymore if you want to get updates much faster and see what coins are going to be doing well follow me on Twitter at zss Becker that's where you get updates so much faster if you like videos like like this and you want to stay on The Cutting Edge of the Bor subscribe because as the Bor picks up these videos are going to become more and more fast-paced with more updated news because as the B keeps going we're not going to be able to just sit in these big coins if we want to make really chunky gains we're going to have to take more faster In-N-Out kind of Trades so you're going to want to be subscribed so you're on The Cutting Edge of those I don't have anything else to say and bye he [Music] `;
export const commonEnglishWords = [
  "the",
  "of",
  "and",
  "a",
  "to",
  "in",
  "is",
  "you",
  "that",
  "it",
  "he",
  "was",
  "for",
  "on",
  "are",
  "as",
  "with",
  "his",
  "they",
  "I",
  "at",
  "be",
  "this",
  "have",
  "from",
  "or",
  "one",
  "had",
  "by",
  "word",
  "but",
  "not",
  "what",
  "all",
  "were",
  "we",
  "when",
  "your",
  "can",
  "said",
  "there",
  "use",
  "an",
  "each",
  "which",
  "she",
  "do",
  "how",
  "their",
  "if",
  "will",
  "up",
  "other",
  "about",
  "out",
  "many",
  "then",
  "them",
  "these",
  "so",
  "some",
  "her",
  "would",
  "make",
  "like",
  "him",
  "into",
  "time",
  "has",
  "look",
  "two",
  "more",
  "write",
  "go",
  "see",
  "number",
  "no",
  "way",
  "could",
  "people",
  "my",
  "than",
  "first",
  "water",
  "been",
  "call",
  "who",
  "oil",
  "its",
  "now",
  "find",
  "long",
  "down",
  "day",
  "did",
  "get",
  "come",
  "made",
  "may",
  "part",
];
import { configure } from "@trigger.dev/sdk/v3";
import { getTranscript } from "../trigger/get_transcript.js";
configure({
  secretKey: "tr_dev_XBmrvqkfaskbVHHhftxD",
});

async function triggerTask() {
  getTranscript.trigger({
    youtubeUrl: "https://www.youtube.com/watch?v=openhM5Gurs",
  });
}

await triggerTask();
