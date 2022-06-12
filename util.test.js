import {Tester} from "@alttiri/util-node-js";
import {fullUrlToFilename} from "./util.js";

const {eq, report} = new Tester().destructible();

eq("ab0", fullUrlToFilename("  about:addons  "),          "[about~] addons");
eq("ab1", fullUrlToFilename("about:addons"),              "[about~] addons");
eq("ab2", fullUrlToFilename("about:addons/xxx/yyy"),      "[about~] addons xxx yyy");

eq("mz1", fullUrlToFilename("moz-extension://12345-123"),     "[moz-extension~] 12345-123");
eq("cr1", fullUrlToFilename("chrome://flags/"),               "[chrome~] flags");
eq("cr2", fullUrlToFilename("chrome://extensions/"),          "[chrome~] extensions");
eq("cr2", fullUrlToFilename("chrome-extension://cjpalhdlnbpafiamejdnhcphjbkeiagm/dashboard.html#about.html"), "[chrome-extension~] cjpalhdlnbpafiamejdnhcphjbkeiagm dashboard.html#about.html");

eq("cr3", fullUrlToFilename("chrome-error://chromewebdata/"), "[chrome-error~] chromewebdata");

eq("ftp", fullUrlToFilename("ftp://192.168.1.1"),   "[ftp~] 192.168.1.1");

eq("s1", fullUrlToFilename("https://example.com"),  "[example.com]");
eq("s2", fullUrlToFilename("https://example.com/"), "[example.com]");

eq("lt1", fullUrlToFilename("https://example.com/привет"), "[example.com] привет");
eq("lt2", fullUrlToFilename("https://example.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82"), "[example.com] привет");
// eq("3lt", fullUrlToFilename("https://xn--j1ay.xn--p1ai/"), "[кц.рф]"); // Punycode

eq("pth", fullUrlToFilename("https://example.com/xxx/yyy"),  "[example.com] xxx yyy");
eq("srh", fullUrlToFilename("https://example.com/?xxx=a"),   "[example.com]  xxx=a");
eq("srh", fullUrlToFilename("https://example.com/?xxx=a#a"), "[example.com]  xxx=a#a");
eq("hss", fullUrlToFilename("https://example.com/#aaa"),     "[example.com] #aaa");
eq("hss", fullUrlToFilename("https://example.com/#?aaa"),    "[example.com] #%3Faaa");

eq("mtp1", fullUrlToFilename("https://example.com/xxx/yyy#aaa"), "[example.com] xxx yyy#aaa");
eq("mtp2", fullUrlToFilename("https://example.com/xxx/yyy/?aaa=aaa"), "[example.com] xxx yyy  aaa=aaa");
eq("mtp3", fullUrlToFilename("https://example.com/xxx/yyy?aaa=aaa"),  "[example.com] xxx yyy  aaa=aaa");

eq("12", fullUrlToFilename("https://example.com/?xxx=a&xx=aa&x=aaa"),       "[example.com]  xxx=a&xx=aa&x=aaa");
eq("13", fullUrlToFilename("https://example.com/?xxx=https://example.com"), "[example.com]  xxx=https%3A%2F%2Fexample.com");
eq("14", fullUrlToFilename("https://example.com/?xxx=https%3A%2F%2Fexample.com%2F%23123%3F%3F454"), "[example.com]  xxx=https%3A%2F%2Fexample.com%2F%23123%3F%3F454");
eq("14", fullUrlToFilename("https://example.com/?xxx=https%3A%2F%2Fexample.com%2F#123%3F%3F454"),   "[example.com]  xxx=https%3A%2F%2Fexample.com%2F#123%3F%3F454");
eq("15", fullUrlToFilename("https://example.com/?xxx=https://example.com/#123??454"),               "[example.com]  xxx=https%3A%2F%2Fexample.com%2F#123%3F%3F454");
eq("16", fullUrlToFilename("https://example.com/?search=red+hat+sun"),      "[example.com]  search=red+hat+sun");
eq("17", fullUrlToFilename("https://example.com/?search=red+hat%20sun"),    "[example.com]  search=red+hat+sun");
eq("18", fullUrlToFilename("https://example.com/?search=red%20hat%20sun"),  "[example.com]  search=red+hat+sun");


report();