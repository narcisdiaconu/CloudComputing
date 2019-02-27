import requests, threading, time

p = 50
b = 5

url = "http://localhost:8001/api/service/?categoryId=none"

results = [0] * p
failures = 0

class MyThread(threading.Thread):
	def __init__(self, index):
		threading.Thread.__init__(self)
		self.total_time = 0
		self.index = index

	def run(self):
		start_time = time.perf_counter()
		r = requests.get(url, {})
		waited_time = time.perf_counter() - start_time
		print("Server responded in " + str(waited_time) + " for Thread " + str(self.index))
		if (r.status_code != 200):
			failures +=1
		results[self.index] += waited_time

threads = [0] * p

for i in range(b):
	for j in range(p):
		threads[j] = MyThread(j)
	for j in threads:
		j.start()
	for j in threads:
		j.join()

total = 0
for i in results:
	total += i

print("\nOn average server responded in: ", total / (p * b))
print("Number of failures: ", failures)