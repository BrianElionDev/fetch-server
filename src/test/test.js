import { configDotenv } from "dotenv";
configDotenv();
const API_CONFIG = {
  ENDPOINT: "https://api.perplexity.ai/chat/completions",
  MODEL: "sonar",
  DEFAULT_SYSTEM_PROMPT_COIN_ANALYSIS:
    "Important for coin names provide offical coin name in coinmarketcap. If a coin cannot be found in coinmarketcap then leave it out. Return a json output only of same type as the sample response, Without ``json code indicator.Output should be a valid json There should be no ***note section.RETURN A JSON OUPUT. IT SHOULD BE VALID JSON",
  DEFAULT_SYSTEM_PROMPT_COIN_SUMMARY:
    "You are an intelligent ai to do anlaysis of youtube video transcrript and give a summary.",
  HEADERS: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
  },
  REQUEST_PARAMS: {
    temperature: 0,
    top_p: 0.9,
    search_domain_filter: null,
    return_images: false,
    return_related_questions: false,
    search_recency_filter: "week",
    top_k: 0,
    stream: false,
    presence_penalty: 0,
    frequency_penalty: 1,
    response_format: null,
  },
};

async function formatSummaryPrompt({ transcript }) {
  const formatted = `You are **Cipher**, an AI assistant specializing in analyzing cryptocurrency content and providing clear, concise, and structured summaries of investment-related discussions.

#### **Task:**

You will be given a **YouTube video transcript** ${transcript} related to cryptocurrency markets. Your job is to **extract key insights** and generate a structured summary that is **informative, easy to scan, and user-friendly**.

#### **Guidelines:**

✅ **Identify and extract:**

* All cryptocurrency coins mentioned

* Investment recommendations

* Price predictions or targets

* Risk warnings or disclaimers

✅ **Generate a structured summary (300-500 words) with:**

* **Crypto Market Overview:** Briefly state the market sentiment and trends.

* **Key Investment Insights:** Highlight major investment takeaways (e.g., Bitcoin outlook, altcoin trends, stocks, or DeFi opportunities).

* **Notable Predictions & Risks:** Clearly separate facts from speculative forecasts.

* **Actionable Advice (if applicable):** Summarize key recommendations from the discussion.

#### **Rules to Follow:**

* Keep the tone **neutral and objective**.

* Use **bullet points** or short paragraphs for easy readability.

* Clearly **separate facts from opinions/predictions**.

* Avoid unnecessary repetition or overly technical details.
###A sample summary:## Crypto Market Overview

The current cryptocurrency market sentiment is mixed, with some investors feeling pessimistic due to recent declines, while others are optimistic about future prospects. Regulatory changes in the U.S. are seen as a positive development, potentially leading to increased mainstream adoption and investment opportunities. The recent decision by the Office of the Comptroller of the Currency (OCC) to allow U.S. banks to engage in crypto activities without prior approval is a significant step forward[1][2][3].

## Key Investment Insights

- **Regulatory Shifts:** The OCC's decision to permit banks to engage in crypto activities marks a significant shift in regulatory stance, potentially increasing institutional involvement and mainstream acceptance[1][2].
- **SEC and CFTC Developments:** The SEC is moving towards clearer regulations, with a focus on fostering innovation rather than enforcement. The CFTC is also expanding its role in crypto regulation, potentially leading to more commodities being classified as such[5].
- **FDIC's New Stance:** The FDIC is adopting a more crypto-friendly approach, aiming to facilitate innovation while maintaining banking security[5].
- **Bitcoin and Stablecoins:** The U.S. government is focusing on building a Bitcoin reserve without using taxpayer funds, which could impact market dynamics[4].

## Notable Predictions & Risks

- **Market Volatility:** The market remains volatile, with recent price fluctuations in response to regulatory announcements[1][4].
- **Regulatory Risks:** Despite positive changes, regulatory battles are not over, and further clarity is needed from other agencies like the Federal Reserve[2].
- **Innovation Opportunities:** Clearer regulations could lead to an explosion of innovation in DeFi and tokenized assets[5].

## Actionable Advice

- **Stay Informed:** Investors should remain vigilant about regulatory changes and their potential impact on the market.
- **Diversification:** Consider diversifying investments across different cryptocurrencies and assets to manage risk.
- **Long-Term Outlook:** The long-term outlook for crypto remains bullish, driven by regulatory clarity and increased institutional participation[5].

## Cryptocurrency Coins Mentioned

- **Bitcoin (BTC)**
- **Ethereum (ETH)**
- **XRP**
- **Dogecoin (DOGE)**
- **Cardano (ADA)**

## Risk Warnings or Disclaimers

- Regulatory changes can significantly impact market volatility and investment outcomes.
- Too much or too little regulation can hinder innovation or lead to abuse.
- Investors should conduct thorough research before making investment decisions.

`;

  return JSON.stringify(formatted);
}

async function fetchCoinTranscriptSummary(formattedPrompt) {
  const body = JSON.stringify({
    model: "sonar",
    messages: [
      {
        role: "system",
        content: API_CONFIG.DEFAULT_SYSTEM_PROMPT_COIN_SUMMARY,
      },
      { role: "user", content: formattedPrompt },
    ],
    ...API_CONFIG.REQUEST_PARAMS,
  });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: body,
  };

  try {
    const response = await fetch(API_CONFIG.ENDPOINT, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Data: \n" + JSON.stringify(data));
    return { data: data, error: null };
  } catch (error) {
    console.error("Error:", error);
    return { data: null, error: error };
  }
}

/* fetchCoinTranscriptSummary(
  await formatSummaryPrompt({
    transcript: `all right this is legit the fourth time I'm trying to record this video for you guys I got calls from lawyers good calls from lawyers that is but launching a new software which is very awesome we've had delivery people coming and going we've had food we you don't need to know the story what you do need to know is in yesterday's video I walked you through this portfolio it's currently about 116 Grand no you're not crazy it says 104 Grand on the screen but we have 12 Grand in salana tokens that you have to add on to this this is a portfolio we're trying to grind up $50,000 to $5 million a clean 100x in this super cycle but there's a guy you probably know him he was on the thumbnail of this video his name is Morad and he would look at this and say Benji you're an idiot for a lot less work a lot less effort and literally just loading a portfolio with 50 Grand and buying this One Singular token going to sleep for 12 months waking up refreshing that wallet you'll have your $5 million and you don't need to do anything you don't even need to be looking at the crypto charts or scrolling Twitter all day and to be honest I think he has a good point I'm not convinced that I'm going to be able to out trade that so in this video I want to review what that one token is and why mad's thesis is so strong that it's convincing me to basically play both sides of the field I'd be bored if I just bought 50 Grand or of this token and then had to go away and try and do something outside crypto the hype is too strong it just keeps pulling me back so I'll actively trade even if it is a fake steering wheel pretending to drive myself around while this second portfolio really prints all the gains and I roundt trip this one so I want to share this with you just in case you want to straddle the ven diagram and do both actively trade and passively trade this specific meme coin or another one of mad's meme coins but the thing is is in order to do this you need to know why Morad is so strongly convicted that this meme coin is going to absolutely print I think 123x on your money in the next 12 months he's projecting I've shown this before this is a tweet from aad he says the biggest gains will be made in meme coins for this cycle going from a total market cap of three Trill to $10 trillion last time it was defi gamei alternative layer ones like polka dot nfts like b a club metaverses like decentral land and then in 2017 you had old coins like Litecoin even xrp which we're going to talk about in a second ethereum and icos which very quickly got banned by the us but you know the US is now coming back around to things and one thing that's definitely not a utility and the US don't have really any control over is memin and that's why he thinks mem coins are going to make more millionaires in this cycle than any other thing that you could possibly trade also if you're interested in mem coins I'm going to about to do a 30 to 60 day Deep dive on mcoin so if you're not subscribed yet super appreciate if you hit that subscribe button I got some awesome content planned including lots of active trading going down in the trenches with you and trying to make literally generational wealth that can retire our Bloodlines cuz if there's an opportunity for it it's literally right now Morad says 95% of people who made big money in crypto did so by holding and holding not just for 3 weeks and being like why is it still down from when I bought it but holding for many months and he says this cycle is no exception even though it's a super cycle these things take time and people with patience will outperform everybody else and his thesis stems from this you can see that this is the fourth time I recorded this because I've already highlighted these things for for you or I guess for myself as I went through it he says every generation has its own barbell strategy which has conservative assets on one side and risky assets or risk assets with more upside but also more downside on the other side of the barbell our generation's barbell strategy is Bitcoin on one side and CT memecoins I'll re highlight this one again because that is the operating word which we're going to dive into this is how he discerns which ones are going to take 50 Grand and turn to 5 mil or 10 grand and turn to 1 mil or 1 grand and turn to 100 Grand is is it a cult meme coin or just a junkyard crappy Street M coin and you can see here Boomers had bonds they may have returned 2 to 4% a year S&P 500 8 to 12% a year if you include dividends Gen X then had S&P 500 with a strong track record hundreds of years of it not hundreds but decades almost 100 plus years of it returning 10 to 12% and then they had Bitcoin which started returning 30 to 120% and this was the Exotic highrisk High return play now however bitcoin's getting a bit boring and that 30% I think Michael sailor thinks it's going to go up 29% % for the next X amount of years I don't know exactly 20 something years until it's at $13 million a coin but where you can make more than 30% a day is in the Colt meme coins this is where the Millennials and gen X's are turning and Morad says that we have two choices which both lead to the same spot one we can lose money three to four times and then come back to holding colts for the long-term Colts we're going to get into that in just a second or two join Colts straight away and skip the expensive lesson again like I said the start of this video actively trading my portfolio of utility coins is going to be number one and I'm straddling this vend diagram or dichotomy should we say CU I'm also about to join a cult with a decent amount of size at least for me mad says coins like xrp and harar are currently flying these are these large layer one dinosaur coins which have ridiculous candles I've got a candle example here 100 billion candle in one month for xrp we'll get into that in just a second but he thinks that this is evidence for Cults and delusion being way more important than technology and utility in order to have a high coin price or coin value per token because xrp is a dinosaur coin from 2017 which has a lot of strong believers they probably are the biggest cult out there but when it comes to technicalities you've got something like SOI which does everything xrp does and way more and way faster but they don't have the cult following cuz they're way newer and they haven't had time to build up that Community yet where xrp you can have that1 billion monthly candle which is just absolutely mind-blowing which Morad says if that can add $100 billion in market cap in a single month top meme coins will hit a hundred billion do plus next year and these top meme coins guys are only in the low hundreds of millions at the moment so how do we identify which of these meme coins are the xrp of the memes and he's got this awesome pyramid which he talks about a lot and it's in his Singapore 2049 presentation where only five tokens are going to be Mission movements and 10 tokens are going to be lifestyle Brands and subcultures and only 25 are going to be CTS and these are the ones where most of the money is going to be made all you have to do is hold well I dug to the bottom of this and I'm going to start with this here this is the classic marad display photo on Twitter as you can see if I hover over here he's got this colorful pinwell a lot of people don't understand that this is actually a representation of a cult meme coin distribution meaning of all the tokens they are very evenly distributed through a lot of members whereas an altcoin distribution which just might look really familiar if for around in the last bull market is they're going to reserve 20% of the tokens for the team and then early investors get some and then the air drop only get like 5% which is the public who've actually used their ecosystem the community is going to get 7% and you really are getting like blood Leed as they print more and more tokens and give them to themselves and then sell into the new demand but cult meme coins can be distinguished by their token nomic how spread out and how thin is the allocation to its holders which is at the core of everything and I think this tweet with over 1.3 million views says it all so this is his criteria we've got videos on this channel breaking down his criteria for the cult meme coins and actually identifying new cult mem coins go and watch those if you haven't already but he's got five Criterion inside his criteria that makes a mem coin a c meme coin I'm not going to go through them all here but what I wanted point out is that all the ones I've highlighted in green which is three out of five are basically there for the same reason as I just described which is to make sure the token distribution is really thin and evenly distributed so buying coins that have undergone multiple negative 70% downturn so tokens that have gone up to 100 Mil and then back down to $30 million market cap is helpful because all the big whales and the big holders have already taken profits and they've redistributed their tokens to the masses which are then going to be able to hold them and not able to shake the floor as much as a big whale study coins that have spent a long time under $10 million market cap this is because once again you're going to shake out the paper hands anyone who doesn't believe in the mission they're not going to spend a long time with their $5,000 allocated to that token uh they're going to sell it and try and look for something way quicker way flashier and anyone who's held for multiple months under a $10 million market cap is very unlikely to sell it when the token finally goes up and then using Buble maps and holder scan to check the distribution all three of these things guys are making sure that the distribution is thin 00 1% per holder that is the best looking allocation according to mad and having people who believe in the mission because they have a stake in it and he's tweeted out this this is nine indicators which at the core of every single one of these categories and indicators that he looks at to determine if this is a good token or not is basically how well distributed that token is it's the patent across all of his analysis and you can see he's got something like median holder rank the her what's this the the hindel Hershman index which we did a video on as well which basically is how spread out is the supply the holder scan distribution score which you can see down here the holder scan distribution score is basically how evenly distributed are the tokens what percentage that is the top 100 owners own and you want this to be as low as possible because when you add up the biggest holders you want them to have tiny amounts because you want everyone to share almost equal parts and you can see anything under about a 50% is good and the actually I won't reveal the exact token yet I'm sure you might know if you follow me here on the channel uh but it's got a very high score in this one and then you've got the top 10 clusters on Bubble maps how what percentage do they own the top 25 clusters and clusters are groups of wallets that are owned by the same people I'm going to show you the bubble maps of this token in just a second and then he uses a tool called Unice to look at the amount of holders that have more than $1,000 worth of the token which is kind of interesting right because you're like oh if they have $1,000 worth of the token or more then they're going to have a higher price impact if they sell it but when you combine it with the even distribution of the actual tokens they can't have a massive impact so it's sort of like bringing up the floor you want the bottom holders to all have over $1,000 worth but all the top holders to have maybe $20,000 worth that's going to be the perfectly distributed token and so you want people to have a vested interest because they're going to go out and work on behalf of the actual token then you've got the percentage of 1K plus holders and you want this to be as high as possible of course and then this one's a very interesting stat too first week new wallet so something like Giga here which is dark green which is good the percentage of new wallets that purchased in the first week of the token becoming available is sort of indicating is there a lot of insiders that bid up Supply like in mute it's almost half of 1% of all tokens were brand new wallets which is if you're going to try and hide your identity and buy across 100 different wallets you have to create 100 new tokens and then buy into this project Mew and pretend that they're not you and pretend they're other people but you you can't really find 100 used wallets so with this stat he's identifying which ones have the least Insider activity and where I've landed uh one because I follow crashes clay as well if you don't know me on the channel I follow the best traders in the world people who have the best track record marada is $30 million worth of meme coins and he didn't start with 30 mil he started with like 1.5 mil crash he turned $15,000 into $15 million with meme coins and he came out with a post today saying that I think these must marad mad who we're talking about now top three best picks in that order his number one choice was Giga and he says I was very close to pulling the trigger early on Giger as well he actually missed this one but it doesn't matter he's he's made maybe $20 million himself on mcoin and Morad recently said Giga will begin its Ascent into the billions soon this is one of the strong longest Colts of this cycle as we saw that with those stats way too many bottom signals around here take the 100 I said 121 but take the 153 X pill an on and you can see that Giga has had a nice pullback it's also if you want to go through their criteria gone recently from a $51 million market cap down to a 17 no it's less than that down to about a $10 million market cap which is the 70% pullback so if you zoom in here as well you'll see wrong way we'll Zoom that way you'll see all the 70 % pullbacks it's had that has shaken out those Diamond hands this one here is actually the biggest one from 66 mil all the way back to a 9 mil market cap shaking out anyone who doesn't have a strong belief in the project the other thing they had was this tiny not tiny massive Wick should I say down 100 Mil market cap when a giant whale sold his bags that he bought in really early with and made a lot of money he got out this thing got bought back up in minutes all the way back up to the hundreds of millions it's also touched a almost a 900 million market cap level and today it actually went down almost to a 300 mil market cap which is I'm waiting for a nice pullback to snipe this guy with a decent size because as I said I'm trying to have this portfolio where I actively traded inside of our Inner Circle and this portfolio which we're trying to beat so it's currently at a $380 million market cap and marad predicts this can go as high as50 billion which is an absolutely insane return on money especially because like he says all you have to do is buy and wait if you believe in his thesis which I do I'm going to set up a second portfolio to do this this is the bubble maps of gigachad and you can see the distribution is very appealing you've got some obviously exchanges here that are holding large amounts and there are some users that do have millions of dollars worth of Giga you can see apart from that it's really well distributed it's been going since January I believe of 20124 so almost a year now and it's got a really big presence I really like it honestly I'm making this video just to convince myself more and more to put some money into this obviously I'm not trying to convince you to buy it I don't care if you do or don't buy it please make your own decision I'm just telling you my thinking behind it and I'm going to be scooping this up extremely soon remember if you are trying to trade meme coins and you haven't yet subscribed you're making a mistake CU I have some really awesome content I'm working really hard on to bring you here in the meme coin world for the super cycle that I think will be really helpful so thanks so much for watching and I'll see you in the next video`,
  })
); */
async function formattedPrompt() {
  const prompt = `## Crypto Market Overview\n\nThe cryptocurrency market is experiencing a mix of optimism and caution. Recent developments, such as the launch of Solana Futures ETFs, have sparked renewed interest in certain tokens[1]. However, the broader market remains volatile, with Bitcoin's price movements influencing altcoins like Solana[1][4]. The Federal Reserve's decision to keep interest rates unchanged has also contributed to market sentiment[1].\n\n## Key Investment Insights\n\n- **Solana (SOL):** Solana has seen a recent price increase, with a 6% rise in the past 24 hours, driven by increased trading volume and the launch of Solana Futures ETFs[1]. It remains a popular choice for developers due to its fast transaction speeds and low fees[3].\n\n- **Meme Coins:** The transcript highlights the potential of meme coins, with some investors predicting significant gains due to their cult-like following and community 
engagement[Transcript]. Morad, a prominent figure, suggests that meme coins could outperform traditional assets in the current cycle[Transcript].\n\n- **Investment Strategies:** The discussion emphasizes both active trading and 
passive holding strategies. Morad advocates for holding meme coins long-term, citing past successes in similar investments[Transcript].\n\n## Notable Predictions & Risks\n\n- **Price Predictions:** Morad predicts that certain meme coins could see returns of up to 123x in the next 12 months[Transcript]. Solana's technical analysts suggest a 
potential upside target of $150-$180 based on a breakout from a converging triangle pattern[1].\n\n- **Risk Warnings:** The transcript notes the high volatility and risk associated with meme coins and cryptocurrencies in general. Investors are advised to conduct thorough research and consider diversification to manage risk[Transcript].\n\n## Actionable Advice\n\n- **Diversification:** Investors are encouraged to diversify their portfolios to mitigate risks associated with high-volatility assets like meme coins[Transcript].\n\n- **Long-Term Outlook:** The discussion suggests that patience is key, with long-term holding strategies potentially leading to significant gains in the crypto market[Transcript].\n\n## Cryptocurrency Coins Mentioned\n\n- **Solana (SOL)**\n- **Bitcoin (BTC)**\n- **XRP**\n- **Giga (Meme Coin)**\n\n## Risk Warnings or Disclaimers\n\n- **Volatility Risk:** Cryptocurrencies, especially meme coins, are highly volatile and can result in significant losses if not managed properly[Transcript].\n- 
**Regulatory Risks:** Changes in regulatory environments can impact market dynamics and investment outcomes[1].\n- **Investment Risk:** Investors should be prepared to lose all their money in crypto investments due to their high-risk nature[2].`;

  const cleanedPrompt = await cleanPrompt(prompt);

  console.log("Cleaned Prompt: \n" + cleanedPrompt);
}

formattedPrompt();
