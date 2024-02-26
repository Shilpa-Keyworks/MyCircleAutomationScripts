const { remote } = require("webdriverio");
// Function to perform a scroll down action
async function scrollDown(driver, startX, startY, endY) {
  await driver.touchAction([
    { action: "press", x: startX, y: startY },
    { action: "wait", ms: 1000 },
    { action: "moveTo", x: startX, y: endY },
    { action: "release" },
  ]);

  // Wait for the scroll action to complete
  await driver.pause(1000);
}

async function main() {
  const desiredCaps = {
    deviceName: "Android",
    platformName: "Android",
    appActivity: "com.bbsscyberlink.mycircleapp.MainActivity",
    automationName: "UiAutomator2",
  };

  const driver = await remote({
    path: "/wd/hub",
    port: 4723,
    capabilities: desiredCaps,
  });
  await driver
    .$(
      "//android.view.View[@content-desc='More']/android.view.ViewGroup/com.horcrux.svg.SvgView/com.horcrux.svg.l/com.horcrux.svg.u"
    )
    .click();
  await driver.$("~CALENDAR").click();
  await driver.pause(1000); // Replacing time.sleep()
  await driver.$("//android.widget.TextView[@text='Create Event']").click();
  await driver.$("~titleInputBox").setValue("Cousin Wedding");
  await driver.$("~subTitleInputBox").setValue("At Sweet Home");
  await driver.$("~highPriorityBtn").click();
  await driver.$("~skipTimeBtn").click();
  await driver.pause(1000);
  await driver.$("//android.widget.TextView[@text='Repeat']").click();
  await driver.pause(1000);
  await driver
    .$("//android.view.ViewGroup[@content-desc='setRepeatOption1']")
    .click();
  await driver.pause(1000);
  await driver
    .$("//android.view.ViewGroup[@content-desc='setAlertBtn']")
    .click();
  await driver.pause(1000);
  await driver
    .$("//android.view.ViewGroup[@content-desc='setAlertOption0']")
    .click();
  await driver.pause(3000);
  //Get the size of the screen to calculate the start and end points of the swipe
  const { width, height } = await driver.getWindowRect();

  // Set the X coordinate for the scroll element
  const location_x = Math.floor(width * 0.5);
  // Set the start and end Y coordinates for the scroll direction (up or down)
  const scrollStartY = Math.floor(height * 0.8); // Start from the bottom 80% of the screen
  const scrollEndY = Math.floor(height * 0.2); // End at the top 20% of the screen

  // Perform the swipe action to scroll down
  await driver.touchAction([
    { action: "press", x: location_x, y: scrollStartY },
    { action: "wait", ms: 1000 },
    { action: "moveTo", x: location_x, y: scrollEndY },
    { action: "release" },
  ]);
  await driver.$("~noteInputBox").waitForDisplayed();
  await driver
    .$("~noteInputBox")
    .setValue(
      "VS Code allows you to quickly search over all files in the currently-opened folder. Press Ctrl+Shift+F and enter your search term."
    );
  await driver.pause(1000);
  await driver
    .$("//android.widget.TextView[@text=' Choose Location']")
    .click();
  await driver.pause(5000);
  await driver
    .$("//android.widget.TextView[@text='Click here to save Location']")
    .click();
  await driver.pause(1000);
  await driver
    .$("//android.view.ViewGroup[@content-desc='attachmentsBtn']")
    .click();
  await driver.$("//android.widget.TextView[@text='Image']").click();
  await driver.pause(2000);
  const firstImage = await driver.$(
    '(//android.widget.ImageView[@resource-id="com.google.android.documentsui:id/icon_thumb"])[1]'
  );
  const secondImage = await driver.$(
    '(//android.widget.ImageView[@resource-id="com.google.android.documentsui:id/icon_thumb"])[2]'
  );
  // Long press on the first image to start multi-selection
  await driver.touchAction({
    action: "longPress",
    element: firstImage,
  });

  // Tap on additional images to select them
  await secondImage.click();
  await driver.pause(5000);
  await driver
    .$(
      "//android.widget.Button[@resource-id='com.google.android.documentsui:id/action_menu_select']"
    )
    .click();
  await driver.pause(3000);
  const newScrollStartY = Math.floor(height * 0.5); // Starting from the middle of the screen
  await scrollDown(driver, location_x, newScrollStartY, scrollEndY);

  // ... (continue with the rest of your code) ...

  // Wait for the scroll action to complete
  await driver.pause(1000);
  await driver.$("~urlInputBox").waitForDisplayed();
  await driver.$("~urlInputBox").setValue("https://www.my-circle.in/");
  await driver.pause(1000);
  await driver.$("~facebookUrlInputBox").waitForDisplayed();
  await driver.$("~facebookUrlInputBox").setValue("https://www.my-circle.in/");
  await driver.pause(1000);
  await driver.$("~instagramUrlInputBox").waitForDisplayed();
  await driver.$("~instagramUrlInputBox").setValue("https://www.my-circle.in/");
  await driver.pause(1000);
  await driver.$("~linkedinUrlInputBox").waitForDisplayed();
  await driver.$("~linkedinUrlInputBox").setValue("https://www.my-circle.in/");
  await driver.$("~SaveBtn").click();
  await driver.pause(1000);

  await driver.deleteSession();
}

main().catch(console.error);
