import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    newsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsItem.pending, (state) => {
      state.newsLoading = true;
    });
    builder.addCase(getNewsItem.fulfilled, (state, action) => {
      state.news.push(action.payload);
      state.newsLoading = false;
    });
    builder.addCase(getNewsItem.rejected, (state) => {
      state.newsLoading = false;
    });
  },
});

export const { setNewsItem } = newsSlice.actions;
export default newsSlice.reducer;

export const getNewsItem = createAsyncThunk("news/getNews", async (id) => {
  try {
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty"
    );

    const newsItem = {
      key: response.data.id,
      title: response.data.title,
      author: response.data.by,
      url: response.data.url,
    };
    // console.log("NEWS OBJECT TO STORE -> ", `${JSON.stringify(response.data)}`);
    // console.log("NEWSITEM OBJECTS -> ", JSON.stringify(newsItem));
    return newsItem;
  } catch (error) {
    console.log(error);
  }
});

export const getNewsObjectFromListOfIds = createAsyncThunk(
  "",
  async (listOfNewsId) => {
    try {
      const list = listOfNewsId.map((id) => {
        getNewsItem(id);
      });
      console.log("Getting list of news Object", list);
      return list;
    } catch (error) {
      console.log(error);
    }
  }
);
