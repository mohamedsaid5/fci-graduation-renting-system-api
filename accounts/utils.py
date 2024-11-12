# utils.py
import os
from PIL import Image, ImageEnhance, ImageOps
from io import BytesIO
import pytesseract
# import face_recognition
import tempfile
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
# import imutils

def pob(id):
    cairo="القاهرة"
    alex="الإسكندرية"
    ps="بورسعيد"
    sw="السويس"
    Du="دمياط"
    dac="الدقهلية"
    sha="الشرقية"
    qal="القليوبية"
    ksh="كفر الشيخ"
    ghar="الغربية"
    mno="المنوفية"
    bhe="البحيرة"
    isma="الإسماعيلية"
    giza="الجيزة"
    basw="بني سويف"
    fay="الفيوم"
    men="المنيا"
    asu="أسيوط"
    soha="سوهاج"
    qen="قنا"
    asw="أسوان"
    auxo="الأقصر"
    ba="البحر الأحمر"
    wg="الوادي الجديد"
    matr="مطروح"
    shsai="شمال سيناء"
    gasai="جنوب سيناء"
    out="خارج الجمهورية"
    govID= id[7:9]
    if(govID=="01"):
        gov=cairo
    elif(govID=="02"):
        gov=alex
    elif(govID=="03"):
        gov=ps
    elif(govID=="04"):
        gov=sw
    elif(govID=="11"):
        gov=Du
    elif(govID=="12"):
        gov=dac
    elif(govID=="13"):
        gov=sha
    elif(govID=="14"):
        gov=qal
    elif(govID=="15"):
        gov=ksh
    elif(govID=="16"):
        gov=ghar
    elif(govID=="17"):
        gov=mno
    elif(govID=="18"):
        gov=bhe
    elif(govID=="19"):
        gov=isma
    elif(govID=="21"):
        gov=giza
    elif(govID=="22"):
        gov=basw
    elif(govID=="23"):
        gov=fay
    elif(govID=="24"):
        gov=men
    elif(govID=="25"):
        gov=asu
    elif(govID=="26"):
        gov=soha
    elif(govID=="27"):
        gov=qen
    elif(govID=="28"):
        gov=asw
    elif(govID=="29"):
        gov=auxo
    elif(govID=="31"):
        gov=ba
    elif(govID=="32"):
        gov=wg
    elif(govID=="33"):
        gov=matr
    elif(govID=="34"):
        gov=shsai
    elif(govID=="35"):
        gov=gasai
    else:
        gov=out
    return gov

def optimize_and_enhance_image(image_field, save_temp=False):
    img = Image.open(image_field)
    img = img.resize((600, 600), Image.Resampling.LANCZOS)
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(2.0)
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.5)
    img = ImageOps.grayscale(img)
    if save_temp:
        # Save the optimized image temporarily for inspection
        temp_filename = 'optimized_temp.jpg'
        img_io = BytesIO()
        img.save(img_io, format='JPEG')
        temp_image_file = ContentFile(img_io.getvalue())
        saved_path = default_storage.save(os.path.join('temp', temp_filename), temp_image_file)
        return default_storage.url(saved_path)
    # Save the optimized image to a BytesIO object
    optimized_image_io = BytesIO()
    img.save(optimized_image_io, format='JPEG')
    optimized_image_io.seek(0)  # Important: reset the file pointer to the beginning

    return optimized_image_io


# utils.py
# import cv2
# import numpy as np
# from pytesseract import image_to_string

# def order_points(pts):
#     # Initial implementation of order_points
#     rect = np.zeros((4, 2), dtype="float32")

#     s = pts.sum(axis=1)
#     rect[0] = pts[np.argmin(s)]
#     rect[2] = pts[np.argmax(s)]

#     diff = np.diff(pts, axis=1)
#     rect[1] = pts[np.argmin(diff)]
#     rect[3] = pts[np.argmax(diff)]

#     return rect

# def four_point_transform(image, pts):
#     rect = order_points(pts)
#     (tl, tr, br, bl) = rect

#     widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
#     widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
#     maxWidth = max(int(widthA), int(widthB))

#     heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
#     heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
#     maxHeight = max(int(heightA), int(heightB))

#     dst = np.array([
#         [0, 0],
#         [maxWidth - 1, 0],
#         [maxWidth - 1, maxHeight - 1],
#         [0, maxHeight - 1]], dtype="float32")

#     M = cv2.getPerspectiveTransform(rect, dst)
#     warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))

#     return warped

# def scan(image_path, side):
#     # Load the image and compute the ratio of the old height
#     # to the new height, clone it, and resize it
#     image = cv2.imread(image_path)
#     ratio = image.shape[0] / 500.0
#     orig = image.copy()
#     image = imutils.resize(image, height = 500)

#     # Convert the image to grayscale, blur it, and find edges
#     # in the image
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     gray = cv2.GaussianBlur(gray, (5, 5), 0)
#     edged = cv2.Canny(gray, 150, 200)

#     # Find the contours in the edged image, keeping only the
#     # largest ones, and initialize the screen contour
#     contours, _ = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
#     cnts = sorted(contours, key=cv2.contourArea, reverse=True)[:5]

#     screenCnt = None
#     # Attempt to find a contour that closely matches a rectangle (four points)
#     for c in cnts:
#         peri = cv2.arcLength(c, True)
#         approx = cv2.approxPolyDP(c, 0.02 * peri, True)
#         if len(approx) == 4:
#             screenCnt = approx
#             break

#     if screenCnt is None and cnts:
#         # Fallback to use the largest contour if no rectangular contour is found
#         screenCnt = cnts[0]  # Using the largest contour

#     # Check if a contour was found and process accordingly
#     if screenCnt is not None:
#         if len(screenCnt) == 4:
#             # Apply the four point transform if a rectangular contour was found
#             warped = four_point_transform(orig, screenCnt.reshape(4, 2) * ratio)
#         else:
#             # For the largest contour (which may not be rectangular), consider alternative processing
#             # This example uses the entire image, but you might want to process the largest contour specifically
#             warped = orig
#     else:
#         print("No contours found. Using the original image.")
#         warped = orig

#     # Resize the processed image
#     newimg = cv2.resize(warped, (1000, 630))
    
#     # Determine the file name based on the side
#     file_name = f"temp_{side}.jpg"

#     # Save the image to Django's media directory
#     file_path = os.path.join("temp", file_name)  # Assuming you have a directory named 'temp'
#     file_url = default_storage.save(file_path, ContentFile(cv2.imencode('.jpg', newimg)[1].tobytes()))

#     # Get the URL of the saved image
#     image_url = default_storage.path(file_url)

#     return image_url


# def front_read(front_src):
#     print("front_read:",front_src)        
#     im_gray = cv2.imread(front_src, cv2.IMREAD_GRAYSCALE)
#     im_bw = cv2.threshold(im_gray, 95, 255, cv2.THRESH_BINARY)[1]

#     pic = im_gray[50:350, 50:275]
#     name = image_to_string(im_bw[150:310, 400:1000], lang="ara").strip()
#     address = image_to_string(im_bw[300:450, 400:1000], lang="ara").strip()


#     return {
#         'name': name,
#         'address': address,

#     }
