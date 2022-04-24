
# **환경 설정**

Tensorflow 등을 이용한 머신러닝 구현에서 가장 기본적이지만 번거롭고 중요한 과정은 사용하는 AI 모델의 버전에 맞춰서 python의 버전 등 여러 환경을 설정하는 것입니다.

사용하는 모델에 따라 사용하는 python 버전이 다를 수 있기에 아나콘다를 이용하여 한 번에 여러가지 python 버전 및 환경을 설정합니다.

예시로 프로젝트에서 사용된 github GAN 모델의 버전은 다음과 같습니다.

- Real-Time-Super-Resolution 모델 github 링크

[https://github.com/braindotai/Real-Time-Super-Resolution](https://github.com/braindotai/Real-Time-Super-Resolution)

```
tensorflow_gpu=2.4.1
python 3.8
CUDA 11.0
cuDNN 8.0
```

### **아나콘다 Anaconda**

> 다양한 python 버전 및 환경을 설정하여 프로젝트에 맞는 라이브러리를 사용하기 위해 설치합니다.
> 
- 아나콘다 설치 링크

[https://www.anaconda.com/products/individual](https://www.anaconda.com/products/individual)

설치 후 관리자 권한으로 `Anaconda Prompt`를 실행합니다.

python을 입력하여 정상적으로 설치되었는지 확인합니다.

정상적으로 설치된 경우 PC에 설치된 python 버전이 나오며 `exit()` 명령어를 통해 나올 수 있습니다.

### **아나콘다에서 가상 환경 생성하기**

```
conda create -n [가상환경 이름] python=3.x # 사용할 모델의 tensorflow 버전에 맞게 python 버전을 설치해줍니다.
conda activate [가상환경 이름] # 가상환경 활성화
pip install -r requirements.txt # 사용할 모델의 패키지를 설치
pip install tensorflow-gpu=2.x.x # 사용할 tensorflow의 버전과 동일한 버전의 tensorflow-gpu 버전을 설치합니다. 
필수는 아니지만 GPU를 사용한 연산이 CPU를 사용한 연산보다 수십배 빠르므로 설치를 권장합니다.
# 모델 실행
conda deactivate # 가상환경 비활성화
```

- 참고 링크

[https://dreamfuture.tistory.com/43](https://dreamfuture.tistory.com/43)







### **CUDA**

> Computed Unified Device Architecture(CUDA)는 GPU 개발을 위해 NVIDIA에서 만든 툴입니다.
> 

기본적으로 필요한 CUDA 버전을 알기 위해서는 사용하는 PC의 GPU 버전을 먼저 파악해야 합니다.

```
nvidia-smi # 기본으로 필요한 CUDA 버전 확인
```

GPU에 따라 사용하는 CUDA 버전이 다릅니다. 해당하는 CUDA 버전을 아래에서 설치해줍니다.

- CUDA 설치 링크

[https://developer.nvidia.com/cuda-toolkit-archive](https://developer.nvidia.com/cuda-toolkit-archive)

CUDA 버전에 따라 python, cuDNN, tensorflow-gpu 버전도 달라집니다.

CUDA 버전에 해당하는 각 프로그램의 버전 내역은 TensorFlow 공식 문서에서 확인 가능합니다.

- CUDA 버전에 따른 python, cuDNN, tensorflow-gpu 버전 확인 링크

[https://www.tensorflow.org/install/source_windows?hl=en#gpu](https://www.tensorflow.org/install/source_windows?hl=en#gpu)

`nvidia-smi` 명령어를 통해 GPU가 지원하는 CUDA 버전을 확인할 수 있지만 모델에 따라 지원하는 CUDA 버전이 달라질 수도 있습니다. 예시로 `cusolver64_11.dll not found` 에러는 모델의 tensorflow와 CUDA 버전이 맞지 않는 경우 발생합니다.

만약 사용하는 머신러닝 모델의 종류가 늘어나 2개 이상의 서로 다른 버전의 CUDA를 사용하는 경우에는 해당하는 CUDA 들을 설치한 후 각각 환경변수에 추가해주면 됩니다. CUDA는 버전에 따라 설치 경로가 달라지기 때문에 설치 후 환경변수 설정만 해주면 됩니다.

### **cuDNN**

> CUDA Deep Neural Network library(cuDNN)은 NVIDIA CUDA 딥 뉴럴 네트워크 라이브러리를 말합니다.  딥 뉴럴 네트워크를 사용하기 위한 GPU 가속화 라이브러리의 기초 요소로 컨볼루션(Convolution), 풀링(Pooling), 표준화(Normalization), 활성화(Activation) 등의 연산 속도를 높여줍니다.
> 

마찬가지로 CUDA의 버전에 맞는 cuDNN을 설치해줍니다.

- cuDNN 설치 링크

[https://developer.nvidia.com/rdp/cudnn-download](https://developer.nvidia.com/rdp/cudnn-download)

다운 받은 cuDNN의 bin, include, lib을 CUDA Toolkit 설치 경로에 복사해줍니다.

### **환경 변수 설정**

다음과 같이 CUDA Toolkit가 설치된 위치에서 `bin`, `lib`, `include` 3개의 경로를 환경 변수 path에 등록하여 줍니다.

`시스템 환경 변수 편집 > 환경 변수 클릭 > 시스템 변수에서 Path 편집 > 새로 만들기로 bin, lib, include 경로 추가 후 확인`

### **Tensorflow-gpu**

아나콘다 가상환경에 설치한 `tensorflow-gpu`가 제대로 설치되었는지 아나콘다 가상환경을 활성화 한 후 다음 테스트 코드를 입력하여 확인할 수 있습니다.

```
from tensorflow.python.client import device_lib
device_lib.list_local_devices()
```